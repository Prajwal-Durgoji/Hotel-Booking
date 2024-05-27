package com.system.sheshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.SellerDetails;
import com.system.sheshare.repository.SellerDetailsRepository;

@Service
public class SellerDetailsService {
	
	@Autowired
	private SellerDetailsRepository sellerDetailsRepository;

	public SellerDetails login(String sellerEmail, String sellerPassword) {
		List<SellerDetails> sellers = sellerDetailsRepository.findAll();
        for (SellerDetails seller : sellers) {
            if (seller.getSellerEmail().equals(sellerEmail) && seller.getSellerPassword().equals(sellerPassword)) {
                return seller;
            }
        }
        return null;
	}
	
	

	
}
