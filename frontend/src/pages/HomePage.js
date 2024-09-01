import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

    useEffect(() => {
        const locationState = location.state;
        if (locationState) {
            setHotels(locationState.hotels);
            setWeather(locationState.weather);
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
                <label>Price Range:
                    <input type="range" min="0" max="10000" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], e.target.value])} />
                    <span className="price-range-value">₹{currentPriceRange}</span> {/* Display the current price range */}
                </label>
                <label>Room Option:
                    <select value={filters.roomOption} onChange={(e) => handleFilterChange('roomOption', e.target.value)}>
                        <option value="">All</option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                        <option value="4BHK">4BHK</option>
                    </select>
                </label>
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