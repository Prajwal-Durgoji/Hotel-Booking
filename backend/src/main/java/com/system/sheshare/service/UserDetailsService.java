package com.system.sheshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.UserDetails;
import com.system.sheshare.repository.UserDetailsRepository;

@Service
public class UserDetailsService {

	@Autowired
	UserDetailsRepository userDetailsRepository;
	

	public void saveUserDetails(UserDetails userDetails) {
		userDetailsRepository.save(userDetails);
		
	}
}
