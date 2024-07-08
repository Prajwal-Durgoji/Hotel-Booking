package com.system.sheshare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.system.sheshare.filer.JwtAuthFilter;
import com.system.sheshare.service.UserBuyerService;
import com.system.sheshare.service.UserSellerService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private JwtAuthFilter authFilter;

	@Autowired
	private UserSellerService userSellerService;

	@Autowired
	private UserBuyerService userBuyerService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	// User Creation
	@Bean
	public UserDetailsService userDetailsService() {
		return username -> {
			try {
				return userSellerService.loadUserByUsername(username);
			} catch (UsernameNotFoundException e) {
				return userBuyerService.loadUserByUsername(username);
			}
		};
	}

//    // Configuring HttpSecurity
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/hotels/register/buyer", "/api/hotels/register/seller",
//                                "/api/hotels/login/seller", "/api/hotels/login/buyer").permitAll()
//                        .requestMatchers("/api/hotels/add/**").authenticated())
//                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authenticationProvider(authenticationProvider())
//                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }

	// Configuring HttpSecurity
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> auth
				// Public endpoints
				.requestMatchers("/api/hotels/register/buyer", "/api/hotels/register/seller",
						"/api/hotels/login/seller", "/api/hotels/login/buyer", "/api/hotels/search",
						"/api/hotels/hotel-details","/api/hotels/hotel-details/{id}","/images/**").permitAll()
				// All other requests
				.anyRequest().authenticated())
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder);
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}