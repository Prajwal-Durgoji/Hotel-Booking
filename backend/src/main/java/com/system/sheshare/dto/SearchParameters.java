package com.system.sheshare.dto;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class SearchParameters {
	
	@Id
	private int id;
	private String location;
    private String checkInDate;
    private String checkOutDate;
    private String roomOption;
    private String hotelName;
    private double price;
    private String imageUrl;
    
    @Column(columnDefinition = "LONGTEXT")
    private String hotelInformation;
    
    @OneToMany(mappedBy = "searchParameters", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Amenity> amenities;
    
    
    

	public String getHotelInformation() {
		return hotelInformation;
	}
	public void setHotelInformation(String hotelInformation) {
		this.hotelInformation = hotelInformation;
	}
	public Set<Amenity> getAmenities() {
		return amenities;
	}
	public void setAmenities(Set<Amenity> amenities) {
		this.amenities = amenities;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getCheckInDate() {
		return checkInDate;
	}
	public void setCheckInDate(String checkInDate) {
		this.checkInDate = checkInDate;
	}
	public String getCheckOutDate() {
		return checkOutDate;
	}
	public void setCheckOutDate(String checkOutDate) {
		this.checkOutDate = checkOutDate;
	}
	public String getRoomOption() {
		return roomOption;
	}
	public void setRoomOption(String roomOption) {
		this.roomOption = roomOption;
	}
	

}
