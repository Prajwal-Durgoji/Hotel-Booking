package com.system.sheshare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.UserSeller;
import com.system.sheshare.repository.UserSellerRepository;

@Service
public class UserSellerService implements UserDetailsService {
	
	@Autowired
	UserSellerRepository userSellerRepository;
	
	@Autowired
    private PasswordEncoder encoder;
		

	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserSeller> userDetail =  userSellerRepository.findByEmail(username);
        System.out.println(userDetail);

        // Converting userDetail to UserDetails
        return userDetail.map(UserSellerDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }
	
	public String addUser(UserSeller userSeller) {
	    userSeller.setPassword(encoder.encode(userSeller.getPassword()));
	    userSellerRepository.save(userSeller);
	    return "User Added Successfully";
	}
}
