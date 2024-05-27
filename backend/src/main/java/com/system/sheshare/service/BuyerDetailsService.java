package com.system.sheshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.BuyerDetails;
import com.system.sheshare.repository.BuyerDetailsRepository;

@Service
public class BuyerDetailsService {
	
	@Autowired
	BuyerDetailsRepository buyerDetailsRepository;

	public BuyerDetails login(String buyerEmail, String buyerPassword) {
	    List<BuyerDetails> buyers = buyerDetailsRepository.findAll();
	    for (BuyerDetails buyer : buyers) {
	        if (buyer.getBuyerEmail().equals(buyerEmail) && buyer.getBuyerPassword().equals(buyerPassword)) {
	            return buyer;
	        }
	    }
	    return null;
	}
	
	
	
}
