package com.system.sheshare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.system.sheshare.dto.BuyerDetails;
import com.system.sheshare.dto.SearchParameters;
import com.system.sheshare.dto.SellerDetails;
import com.system.sheshare.dto.UserDetails;
import com.system.sheshare.service.BuyerDetailsService;
import com.system.sheshare.service.HotelService;
import com.system.sheshare.service.SellerDetailsService;
import com.system.sheshare.service.UserDetailsService;

@Controller
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {
	
	@Autowired
	private HotelService hotelService;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	SellerDetailsService sellerDetailsService;
	
	@Autowired
	BuyerDetailsService buyerDetailsService;

	@GetMapping("/search")
    public ResponseEntity<List<SearchParameters>> searchHotels(
            @RequestParam String location,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate) {
        List<SearchParameters> searchResults = hotelService.searchHotels(location, checkInDate, checkOutDate);
        System.out.println(searchResults);
        return ResponseEntity.ok(searchResults);
    }
	

    @PostMapping("/savedetails")
    public ResponseEntity<?> saveDetails(@RequestBody UserDetails userDetails) {
        userDetailsService.saveUserDetails(userDetails);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/hotel-details/{id}")
	public ResponseEntity<SearchParameters> getHotelDetails(@PathVariable("id") int id) {
		SearchParameters searchParameters = hotelService.getHotelDetails(id);
		return ResponseEntity.ok(searchParameters);
		
	}
    
    @PostMapping("/login/seller")
    public ResponseEntity<SellerDetails> login(@RequestBody SellerDetails request) {
        SellerDetails seller = sellerDetailsService.login(request.getSellerEmail(), request.getSellerPassword());
        if (seller != null) {
            return new ResponseEntity<>(seller, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
    @PostMapping("/login/buyer")
    public ResponseEntity<BuyerDetails> loginBuyer(@RequestBody BuyerDetails request) {
        BuyerDetails buyer = buyerDetailsService.login(request.getBuyerEmail(), request.getBuyerPassword());
        if (buyer != null) {
        	System.out.println(buyer);
            return new ResponseEntity<>(buyer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
    @PostMapping("/add")
    public ResponseEntity<SearchParameters> addSearchParameters(@RequestBody SearchParameters searchParameters) {
        SearchParameters savedSearchParameters = hotelService.save(searchParameters);
        return new ResponseEntity<>(savedSearchParameters, HttpStatus.CREATED);
    }
    
    @GetMapping("/hotel-details")
	public ResponseEntity<List<SearchParameters>> getAllHotelDetails() {
		List<SearchParameters> searchParameters = hotelService.getAllHotelDetails();
		return ResponseEntity.ok(searchParameters);
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    

}
