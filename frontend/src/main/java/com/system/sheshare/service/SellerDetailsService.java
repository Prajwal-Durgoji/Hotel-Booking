package com.system.sheshare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.SellerDetails;
import com.system.sheshare.repository.SellerDetailsRepository;

@Service
public class SellerDetailsService {
	
	@Autowired
	SellerDetailsRepository sellerRepository;

	public SellerDetails saveSellerDetails(SellerDetails sellerDetails) {
	    return sellerRepository.save(sellerDetails);
	}
	
    public Optional<SellerDetails> findSellerByEmail(String email) {
        return sellerRepository.findBySellerEmail(email);
    }

//    public SellerDetails login(String sellerEmail, String sellerPassword) {
//		List<SellerDetails> sellers = sellerRepository.findAll();
//        for (SellerDetails seller : sellers) {
//            if (seller.getSellerEmail().equals(sellerEmail) && seller.getSellerPassword().equals(sellerPassword)) {
//                return seller;
//            }
//        }
//        return null;
//	}

	

}
