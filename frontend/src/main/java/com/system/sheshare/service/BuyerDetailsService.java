package com.system.sheshare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.BuyerDetails;
import com.system.sheshare.repository.BuyerDetailsRepository;

@Service
public class BuyerDetailsService {
	
	@Autowired
	BuyerDetailsRepository buyerRepository;

	public Optional<BuyerDetails> findBuyerByEmail(String email) {
		return buyerRepository.findByBuyerEmail(email);
	}

	public BuyerDetails saveBuyerDetails(BuyerDetails request) {
		return buyerRepository.save(request);
		
	}
}
