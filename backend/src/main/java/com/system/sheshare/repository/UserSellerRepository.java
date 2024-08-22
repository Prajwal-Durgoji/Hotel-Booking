package com.system.sheshare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.system.sheshare.dto.UserSeller;

public interface UserSellerRepository extends JpaRepository<UserSeller, Integer> {
	Optional<UserSeller> findByEmail(String username);

}
