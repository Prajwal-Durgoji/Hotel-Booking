package com.system.sheshare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.system.sheshare.dto.SearchParameters;

public interface SearchParametersRepository extends JpaRepository<SearchParameters, Long> {
	List<SearchParameters> findByLocationAndCheckInDateAndCheckOutDate(String location, String checkInDate,
			String checkOutDate);

	Optional<SearchParameters> findById(int id);
}
