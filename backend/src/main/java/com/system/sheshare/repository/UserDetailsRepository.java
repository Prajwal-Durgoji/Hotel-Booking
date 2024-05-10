package com.system.sheshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.system.sheshare.dto.UserDetails;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

}
