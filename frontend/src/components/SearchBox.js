import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';

const SearchBox = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [cities, setCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false); 
    const searchInputRef = useRef(null);

    const fetchCities = useCallback(async () => {
        try {
            const response = await fetch('https://api.countrystatecity.in/v1/countries/IN/cities', {
                headers: {
                    'X-CSCAPI-KEY': 'am5pQWtqUUpzbzVtTkZ4c2NjM082NXF6VFNIZzBvSUREcGRvbERNUw==' 
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Failed to fetch cities:", error);
        }
    }, []);

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        if (name === 'checkInDate') setCheckInDate(value);
        if (name === 'checkOutDate') setCheckOutDate(value);
    }, []);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const handleCitySelect = useCallback((city) => {
        setLocation(city);
        setSearchQuery(city);
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
    }, []);

    const handleClick = useCallback(async () => {
        setLoading(true); 
        const checkInDateFormatted = formatDate(checkInDate);
        const checkOutDateFormatted = formatDate(checkOutDate);
        console.log(`Formatted Dates: Check-In: ${checkInDateFormatted}, Check-Out: ${checkOutDateFormatted}, location: ${location}`);

        try {
            const response = await fetch(`http://localhost:8080/api/hotels/search?location=${encodeURIComponent(location)}&checkInDate=${checkInDateFormatted}&checkOutDate=${checkOutDateFormatted}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Search response:', data);

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=c756376ecfb04f4da076b14f29711818&units=metric`);
            if (!weatherResponse.ok) {
                throw new Error(`HTTP error! status: ${weatherResponse.status}`);
            }
            const weatherData = await weatherResponse.json();
            console.log(`Weather in ${location}: ${weatherData.weather[0].main}, ${weatherData.main.temp}°C`);

            navigate("/home", { state: { hotels: data, weather: weatherData } });
        } catch (error) {
            console.error("Failed to fetch hotels or weather:", error);
        } finally {
            setLoading(false); 
        }
    }, [location, checkInDate, checkOutDate, navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const filteredCities = cities.filter(city => city.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className="search-box__container">
                <h1>LET'S GO!<br />THE <span>ADVENTURE</span> IS<br /> WAITING FOR YOU</h1>
                <p>
                    Embark on Your Journey Today and Discover Uncharted Wonders Around the
                    World - Your Adventure Awaits with Exciting Experiences, Unforgettable
                    Memories, and Endless Opportunities
                </p>
                <div className="search-box__input">
                    <div className="input-group">
                        <label>Where</label>
                        <input
                            type="text"
                            name="location"
                            value={searchQuery}
                            placeholder="Enter City"
                            onChange={handleSearchChange}
                            autoComplete="off"
                            ref={searchInputRef}
                        />
                        {searchQuery && (
                            <ul className="dropdown">
                                <div className="dropdown-inner">
                                    {filteredCities.map(city => {
                                        let cityName = city.name;
                                        if (cityName === "Bangalore Rural" || cityName === "Bangalore Urban") {
                                            cityName = "Bangalore";
                                        }
                                        return (
                                            <li key={city.id} onClick={() => handleCitySelect(`${cityName},IN`)}>
                                                <i className="fas fa-map-marker-alt location-icon"></i> {cityName},IN
                                            </li>
                                        );
                                    })}
                                </div>
                            </ul>
                        )}
                    </div>
                    <div className="date-inputs">
                        <div className="input-group">
                            <label>Check-in</label>
                            <input type="date" name="checkInDate" placeholder="Check-in date" onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Check-out</label>
                            <input type="date" name="checkOutDate" placeholder="Check-out date" onChange={handleChange} />
                        </div>
                    </div>
                    <button type="button" className='search-button' onClick={handleClick} disabled={loading}>
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                </div>
            </div>

            <div className="travel-container">
                <img src="/images/header-bg.png" alt="Header-Bg" />
                <img className="outside-image" src="/images/header.png" alt="Another Header-Bg" />
                <div className="header__image">
                    <div className="header__image__card header__image__card-1">
                        <span><i className="ri-key-line"></i></span>
                        Hotel Booking
                    </div>
                    <div className="header__image__card header__image__card-2">
                        <span><i className="ri-passport-line"></i></span>
                        Flight Tickets
                    </div>
                    <div className="header__image__card header__image__card-3">
                        <span><i className="ri-map-2-line"></i></span>
                        Local Events
                    </div>
                    <div className="header__image__card header__image__card-4">
                        <span><i className="ri-guide-line"></i></span>
                        Tour Guide
                    </div>
                </div>
            </div>
        </>
    );
};
export default SearchBox;


// 'X-CSCAPI-KEY': 'am5pQWtqUUpzbzVtTkZ4c2NjM082NXF6VFNIZzBvSUREcGRvbERNUw=='