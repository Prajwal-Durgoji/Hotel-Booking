package com.system.sheshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.sheshare.dto.UserForm;
import com.system.sheshare.repository.UserFormRepository;

@Service
public class UserFormService {

	@Autowired
	UserFormRepository userFormRepository;
	

	public void saveUserDetails(UserForm userForm) {
		userFormRepository.save(userForm);
		
	}
}
