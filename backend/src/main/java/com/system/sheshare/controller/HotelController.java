package com.system.sheshare.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
import com.system.sheshare.dto.UserBuyer;
import com.system.sheshare.dto.UserSeller;
import com.system.sheshare.service.BuyerDetailsService;
import com.system.sheshare.service.HotelService;
import com.system.sheshare.service.JwtService;
import com.system.sheshare.service.SellerDetailsService;
import com.system.sheshare.service.UserBuyerService;
import com.system.sheshare.service.UserSellerService;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hotels")
public class HotelController {

	@Autowired
	HotelService hotelService;

	@Autowired
	UserBuyerService userBuyerService;

	@Autowired
	UserSellerService userSellerService;

	@Autowired
	SellerDetailsService sellerDetailsService;

	@Autowired
	BuyerDetailsService buyerDetailsService;

	@Autowired
	JwtService jwtService;

	@Autowired
	AuthenticationManager authenticationManager;

	@PostMapping("/register/seller")
	public ResponseEntity<String> addNewUser(@RequestBody UserSeller userSeller) { // Admin adding new seller user
		String response = userSellerService.addUser(userSeller);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PostMapping("/register/buyer")
	public ResponseEntity<String> addNewBuyer(@RequestBody UserBuyer userBuyer) { // Admin adding new buyer user
		String response = userBuyerService.addUser(userBuyer);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PostMapping("/login/buyer")
	public ResponseEntity<Map<String, Object>> loginBuyer(@RequestBody BuyerDetails request) {
		// Check if buyer already exists using BuyerDetailsService
		Optional<BuyerDetails> existingBuyer = buyerDetailsService.findBuyerByEmail(request.getBuyerEmail());
		if (!existingBuyer.isPresent()) {
			// Save new buyer details if not exists
			buyerDetailsService.saveBuyerDetails(request);
		}
		// Authenticate the buyer
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getBuyerEmail(), request.getBuyerPassword()));
		if (authentication.isAuthenticated()) {
			// Assuming existingBuyer is now present after save
			existingBuyer = buyerDetailsService.findBuyerByEmail(request.getBuyerEmail());
			BuyerDetails buyer = existingBuyer.get();
			String token = jwtService.generateToken(buyer.getBuyerEmail(), "buyer");
			Map<String, Object> response = new HashMap<>();
			response.put("token", token);
			response.put("buyerId", buyer.getBuyerId());
			response.put("buyerEmail", buyer.getBuyerEmail());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			throw new UsernameNotFoundException("Invalid user request!");
		}
	}

	@PostMapping("/login/seller")
	public ResponseEntity<Map<String, Object>> loginSeller(@RequestBody SellerDetails request) {
		// Check if seller already exists using SellerDetailsService
		Optional<SellerDetails> existingSeller = sellerDetailsService.findSellerByEmail(request.getSellerEmail());
		if (!existingSeller.isPresent()) {
			// Save new seller details if not exists
			sellerDetailsService.saveSellerDetails(request);
		}
		// Authenticate the seller
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getSellerEmail(), request.getSellerPassword()));
		if (authentication.isAuthenticated()) {
			// Assuming existingSeller is now present after save
			existingSeller = sellerDetailsService.findSellerByEmail(request.getSellerEmail());
			SellerDetails seller = existingSeller.get();
			String token = jwtService.generateToken(seller.getSellerEmail(), "seller");
			Map<String, Object> response = new HashMap<>();
			response.put("token", token);
			response.put("sellerId", seller.getSellerId());
			response.put("sellerEmail", seller.getSellerEmail());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			throw new UsernameNotFoundException("Invalid user request!");
		}
	}

	@GetMapping("/search") // buyer
	public ResponseEntity<List<SearchParameters>> searchHotels(@RequestParam String location,
			@RequestParam String checkInDate, @RequestParam String checkOutDate) {
		List<SearchParameters> searchResults = hotelService.searchHotels(location, checkInDate, checkOutDate);
		System.out.println(searchResults);
		return ResponseEntity.ok(searchResults);
	}

	@GetMapping("/hotel-details/{id}") // buyer
	public ResponseEntity<SearchParameters> getHotelDetails(@PathVariable("id") int id) {
		SearchParameters searchParameters = hotelService.getHotelDetails(id);
		return ResponseEntity.ok(searchParameters);
	}

	@PostMapping("/add")
    public ResponseEntity<SearchParameters> addSearchParameters(@RequestBody SearchParameters searchParameters) {
        SearchParameters savedSearchParameters = hotelService.save(searchParameters);
        return new ResponseEntity<>(savedSearchParameters, HttpStatus.CREATED);
    }
	
	@GetMapping("/hotel-details") // buyer
	public ResponseEntity<List<SearchParameters>> getAllHotelDetails() {
		List<SearchParameters> searchParameters = hotelService.getAllHotelDetails();
		return ResponseEntity.ok(searchParameters);
	}
}
