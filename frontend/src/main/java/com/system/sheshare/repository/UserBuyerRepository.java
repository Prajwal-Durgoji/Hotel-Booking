package com.system.sheshare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.sheshare.dto.UserBuyer;

@Repository
public interface UserBuyerRepository extends JpaRepository<UserBuyer, Integer> {

	Optional<UserBuyer> findByEmail(String username);

	
	
	

}
