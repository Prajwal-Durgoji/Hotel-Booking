package com.system.sheshare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.UserBuyer;
import com.system.sheshare.repository.UserBuyerRepository;

@Service
public class UserBuyerService implements UserDetailsService{

	@Autowired
    private UserBuyerRepository userBuyerRepository; // Assume this is your JPA repository
	
	@Autowired
	private PasswordEncoder encoder;

    
	
	public String addUser(UserBuyer userBuyer) {
		userBuyer.setPassword(encoder.encode(userBuyer.getPassword()));
		userBuyerRepository.save(userBuyer);
		return "User Added Successfully";
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<UserBuyer> userDetail = userBuyerRepository.findByEmail(username);

		// Converting userDetail to UserDetails
		return userDetail.map(UserBuyerDetails::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
	}
}
