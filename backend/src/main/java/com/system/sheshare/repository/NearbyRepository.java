package com.system.sheshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.system.sheshare.dto.NearbyPlace;

public interface NearbyRepository extends JpaRepository<NearbyPlace, Long> {
}
