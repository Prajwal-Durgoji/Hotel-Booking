package com.system.sheshare.filer;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.system.sheshare.service.JwtService;
import com.system.sheshare.service.UserBuyerService;
import com.system.sheshare.service.UserSellerService;

import java.io.IOException;

// This class helps us to validate the generated jwt token
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserSellerService userSellerService;

	@Autowired
	private UserBuyerService userBuyerService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");
		String token = null;
		String username = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
			username = jwtService.extractUsername(token);
		}

//		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//			UserDetails userDetails = userSellerService.loadUserByUsername(username);
//			if (jwtService.validateToken(token, userDetails)) {
//				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
//						null, userDetails.getAuthorities());
//				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//				SecurityContextHolder.getContext().setAuthentication(authToken);
//			}
//		}
//		filterChain.doFilter(request, response);
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        UserDetails userDetails = null;
	        try {
	            userDetails = userSellerService.loadUserByUsername(username);
	        } catch (UsernameNotFoundException e) {
	            userDetails = userBuyerService.loadUserByUsername(username);
	        }

	        if (jwtService.validateToken(token, userDetails)) {
	            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
	                    null, userDetails.getAuthorities());
	            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	        }
	    }
	    filterChain.doFilter(request, response);
	}

}