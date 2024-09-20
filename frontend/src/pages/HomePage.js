import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slider, Select, MenuItem, FormControl, InputLabel, Rating } from '@mui/material';
import './HomePage.css';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [weather, setWeather] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        roomOption: ''
    });
    const [currentPriceRange, setCurrentPriceRange] = useState(10000);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        const locationState = location.state;
        if (locationState) {
            setHotels(locationState.hotels);
            setWeather(locationState.weather);
            const initialRatings = {};
            locationState.hotels.forEach(hotel => {
                initialRatings[hotel.id] = hotel.rating;
            });
            setRatings(initialRatings);
            console.log("HomePage state:", locationState);
            console.log("Weather state:", locationState.weather);
        }
    }, [location]);

    const handleHotelClick = useCallback((hotelId) => {
        navigate("/hotel-details", { state: hotelId });
        console.log("Navigating to hotel details for hotelId:", hotelId);
    }, [navigate]);

    const handleFilterChange = useCallback((filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
        if (filterName === 'priceRange') {
            setCurrentPriceRange(value[1]);
        }
        console.log("Filters updated:", filters);

    }, [filters]);

    const handleRatingChange = useCallback((hotelId, newRating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [hotelId]: newRating
        }));
        console.log(`Rating for hotel ${hotelId} updated to ${newRating}`);
    }, []);

    const applyFilters = useCallback(() => {
        return hotels.filter(hotel => {
            const priceMatch = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
            const roomMatch = filters.roomOption ? hotel.roomOption === filters.roomOption : true;
            console.log("Filtering hotel:", hotel.name, { priceMatch, roomMatch });
            return priceMatch && roomMatch;
        });
    }, [hotels, filters]);

    const filteredHotels = applyFilters();
    console.log("Filtered hotels:", filteredHotels);
    return (
        <>
            <div className="filters">
                <FormControl fullWidth>
                    <InputLabel>Price Range</InputLabel>
                    <Slider
                        value={filters.priceRange}
                        onChange={(newValue) => handleFilterChange('priceRange', newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                    />
                    <span className="price-range-value">₹{currentPriceRange}</span>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Room Option</InputLabel>
                    <Select
                        value={filters.roomOption}
                        onChange={(e) => handleFilterChange('roomOption', e.target.value)}
                    >
                        <MenuItem value=""><em>All</em></MenuItem>
                        <MenuItem value="1BHK">1BHK</MenuItem>
                        <MenuItem value="2BHK">2BHK</MenuItem>
                        <MenuItem value="3BHK">3BHK</MenuItem>
                        <MenuItem value="4BHK">4BHK</MenuItem>
                    </Select>
                </FormControl>
                {weather && (
                    <div className="weather-info">
                        <h2>Weather in {weather.name}: {weather.weather[0].main}</h2>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                    </div>
                )}
            </div>
            <div className="container-hotel">
                {Array.isArray(filteredHotels) && filteredHotels.map((hotel, index) => (
                    <div key={index} className="hotel-card" onClick={() => handleHotelClick(hotel.id)}>
                        <img src={`http://localhost:8080/${hotel.imageUrl}`} alt={hotel.hotelName} />
                        <div className="hotel-info">
                            <h2>{hotel.hotelName}</h2>
                            <p>Price: ₹{hotel.price}</p>
                            <p>Rooms: {hotel.roomOption}</p>
                            <Rating
                                value={ratings[hotel.id] ?? hotel.rating ?? 0}
                                onChange={(newValue) => handleRatingChange(hotel.id, newValue)}
                                onClick={(e) => e.stopPropagation()} 
                            />
                            <div className="nearby-container">
                                {Array.from(hotel.nearby).map((place, index) => (
                                    <div key={index} className="nearby-place">
                                        {place.place}
                                    </div>
                                ))}
                            </div>
                            <p>Area: {hotel.area}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePage;