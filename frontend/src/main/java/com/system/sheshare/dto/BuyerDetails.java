package com.system.sheshare.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BuyerDetails {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int buyerId;
	private String buyerEmail;
	private String buyerPassword;
	public int getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(int buyerId) {
		this.buyerId = buyerId;
	}
	public String getBuyerEmail() {
		return buyerEmail;
	}
	public void setBuyerEmail(String buyerEmail) {
		this.buyerEmail = buyerEmail;
	}
	public String getBuyerPassword() {
		return buyerPassword;
	}
	public void setBuyerPassword(String buyerPassword) {
		this.buyerPassword = buyerPassword;
	}
	
}
