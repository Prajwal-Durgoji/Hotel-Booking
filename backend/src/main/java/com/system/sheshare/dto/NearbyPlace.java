package com.system.sheshare.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class NearbyPlace {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "search_parameters_id")
    @JsonBackReference
    private SearchParameters searchParameters;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public SearchParameters getSearchParameters() {
		return searchParameters;
	}

	public void setSearchParameters(SearchParameters searchParameters) {
		this.searchParameters = searchParameters;
	}
    
    

}
