package com.system.sheshare.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.system.sheshare.dto.UserSeller;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserSellerDetails implements UserDetails {

    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserSellerDetails(UserSeller userSeller) {
        email = userSeller.getEmail();
        password = userSeller.getPassword();
        authorities = Arrays.stream(userSeller.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}