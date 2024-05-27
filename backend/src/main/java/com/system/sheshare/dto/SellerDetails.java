package com.system.sheshare.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SellerDetails {
	
	@Id
	private int sellerId;
	private String sellerEmail;
	private String sellerPassword;
	public int getSellerId() {
		return sellerId;
	}
	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}
	public String getSellerEmail() {
		return sellerEmail;
	}
	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}
	public String getSellerPassword() {
		return sellerPassword;
	}
	public void setSellerPassword(String sellerPassword) {
		this.sellerPassword = sellerPassword;
	}
	
	
	
	
	
	
	
	
	
}
