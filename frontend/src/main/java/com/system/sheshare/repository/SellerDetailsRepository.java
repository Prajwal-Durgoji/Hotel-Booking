package com.system.sheshare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.sheshare.dto.SellerDetails;

@Repository
public interface SellerDetailsRepository extends JpaRepository<SellerDetails, Integer> {

	Optional<SellerDetails> findBySellerEmail(String email);

}
