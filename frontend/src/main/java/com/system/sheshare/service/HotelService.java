package com.system.sheshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.SearchParameters;
import com.system.sheshare.repository.SearchParametersRepository;

@Service
public class HotelService {

	@Autowired
	SearchParametersRepository searchParametersRepository;
	

	public List<SearchParameters> searchHotels(String location, String checkInDate, String checkOutDate) {
		return searchParametersRepository.findByLocationAndCheckInDateAndCheckOutDate(location,
				checkInDate, checkOutDate);
	}

	public SearchParameters getHotelDetails(int id) {
		return searchParametersRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Hotel not found"));
	}

	public SearchParameters save(SearchParameters searchParameters) {
        return searchParametersRepository.save(searchParameters);
    }

	public List<SearchParameters> getAllHotelDetails() {
		return searchParametersRepository.findAll();
	}

}
