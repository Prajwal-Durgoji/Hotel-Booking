package com.system.sheshare.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.SearchParameters;
import com.system.sheshare.repository.AmenityRepository;
import com.system.sheshare.repository.NearbyRepository;
import com.system.sheshare.repository.SearchParametersRepository;
import com.system.sheshare.repository.SellerDetailsRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class HotelService {

	@Autowired
	SearchParametersRepository searchParametersRepository;
	
	@Autowired
	SellerDetailsRepository sellerDetailsRepository;
	
	@Autowired
	AmenityRepository amenityRepository;
	
	@Autowired
	NearbyRepository nearbyRepository;
	

    @PersistenceContext
    private EntityManager entityManager;
	

	public List<SearchParameters> searchHotels(String location, String checkInDate, String checkOutDate) {
		return searchParametersRepository.findByLocationAndCheckInDateAndCheckOutDate(location,
				checkInDate, checkOutDate);
	}

	public SearchParameters getHotelDetails(int id) {
		return searchParametersRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Hotel not found"));
	}
	
	public List<SearchParameters> getAllHotelDetails() {
		return searchParametersRepository.findAll();
	}

	public SearchParameters save(SearchParameters searchParameters) {
        return searchParametersRepository.save(searchParameters);
    }
	

	

}
