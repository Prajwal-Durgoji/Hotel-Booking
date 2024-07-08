package com.system.sheshare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.sheshare.dto.BuyerDetails;

@Repository
public interface BuyerDetailsRepository extends JpaRepository<BuyerDetails, Integer> {


	Optional<BuyerDetails> findByBuyerEmail(String email);



}
