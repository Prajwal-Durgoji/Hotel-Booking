package com.system.sheshare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.Amenity;
import com.system.sheshare.dto.NearbyPlace;
import com.system.sheshare.dto.SearchParameters;
import com.system.sheshare.dto.SellerDetails;
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
	
//	public SearchParameters save(SearchParameters searchParameters) {
//        // Assuming the seller email is set in searchParameters
//        String sellerEmail = searchParameters.getSellerDetails().getSellerEmail();
//        Optional<SellerDetails> optionalSellerDetails = sellerDetailsRepository.findBySellerEmail(sellerEmail);
//        if (optionalSellerDetails.isPresent()) {
//            searchParameters.setSellerDetails(optionalSellerDetails.get());
//        } else {
//            // Handle the case where the seller is not found
//            throw new RuntimeException("Seller not found");
//        }
//
//        return searchParametersRepository.save(searchParameters);
//    }

	public Amenity saveAmenity(Amenity amenity) {
        if (amenity.getId() != null) {
            return entityManager.merge(amenity);
        } else {
            return amenityRepository.save(amenity);
        }
    }

    public NearbyPlace saveNearby(NearbyPlace nearbyPlace) {
        if (nearbyPlace.getId() != null) {
            return entityManager.merge(nearbyPlace);
        } else {
            return nearbyRepository.save(nearbyPlace);
        }
    }

}
