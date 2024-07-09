
import React, { PureComponent } from 'react'
import { useLocation } from 'react-router-dom';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

// class HomePage extends PureComponent {
//     constructor(props) {
//         super(props)
//         this.state = {
//             hotels: [],
//             weather: null
//         }
//     }

//     componentDidMount() {
//         const locationState = this.props.location.state;
//         if (locationState) {
//             this.setState({ 
//                 hotels: locationState.hotels,
//                 weather: locationState.weather // Set weather state
//             });
//             console.log("HomePage state:", locationState);
//             console.log("Weather state:", locationState.weather);
//         }
//     }


//     handleHotelClick = (hotelId) => {
//         this.props.navigate("/hotel-details", { state: hotelId });
//         console.log("Navigating to hotel details for hotelId:", hotelId);
//     }

//     render() {
//         const { weather } = this.state;
//         return (
//             <div className="container-hotel">
//                 {weather && ( 
//                     <div className="weather-info">
//                         <h2>Weather in {weather.name}: {weather.weather[0].main}</h2>
//                         <p>Temperature: {weather.main.temp}°C</p>
//                         <p>Humidity: {weather.main.humidity}%</p>
//                     </div>
//                 )}
//                 {Array.isArray(this.state.hotels) && this.state.hotels.map((hotel, index) => (
//                     <div key={index} className="hotel-card" onClick={() => this.handleHotelClick(hotel.id)}>
//                         <img src={`http://localhost:8080/${hotel.imageUrl}`} alt={hotel.hotelName} />
//                         <div className="hotel-info">
//                             <h2>{hotel.hotelName}</h2>
//                             <p>Price: ₹{hotel.price}</p>
//                             <p>Rooms: {hotel.roomOption}</p>

//                             <div className="nearby-container">
//                                 {Array.from(hotel.nearby).map((place, index) => (
//                                     <div key={index} className="nearby-place">
//                                         {place.place}
//                                     </div>
//                                 ))}
//                             </div>
//                             <p>Area: {hotel.area}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }
// }

// const HomePageWithLocation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     return <HomePage location={location} navigate={navigate} />
// }

// export default HomePageWithLocation;
class HomePage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            hotels: [],
            weather: null,
            filters: {
                priceRange: [0, 10000], // Assuming default price range
                roomOption: '', // Empty means no filter
                area: '' // Empty means no filter
            },
            currentPriceRange: 10000 
        }
    }

    componentDidMount() {
        const locationState = this.props.location.state;
        if (locationState) {
            this.setState({
                hotels: locationState.hotels,
                weather: locationState.weather // Set weather state
            });
            console.log("HomePage state:", locationState);
            console.log("Weather state:", locationState.weather);
        }
    }

    handleHotelClick = (hotelId) => {
        this.props.navigate("/hotel-details", { state: hotelId });
        console.log("Navigating to hotel details for hotelId:", hotelId);
    }

    handleFilterChange = (filterName, value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [filterName]: value
            },
            currentPriceRange: filterName === 'priceRange' ? value[1] : prevState.currentPriceRange
        }));
    }

    applyFilters = () => {
        const { hotels, filters } = this.state;
        return hotels.filter(hotel => {
            const priceMatch = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
            const roomMatch = filters.roomOption ? hotel.roomOption === filters.roomOption : true;
            const areaMatch = filters.area ? hotel.area === filters.area : true;
            return priceMatch && roomMatch && areaMatch;
        });
    }

    render() {
        const { weather, filters, currentPriceRange } = this.state;
        const filteredHotels = this.applyFilters();
        return (
            <div className="container-hotel">
                <div className="filters">
                <label>Price Range:
                        <input type="range" min="0" max="10000" value={filters.priceRange[1]} onChange={(e) => this.handleFilterChange('priceRange', [filters.priceRange[0], e.target.value])} />
                        <span className="price-range-value">₹{currentPriceRange}</span> {/* Display the current price range */}
                    </label>
                    <label>Room Option:
                        <select value={filters.roomOption} onChange={(e) => this.handleFilterChange('roomOption', e.target.value)}>
                            <option value="">All</option>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                            <option value="4BHK">4BHK</option>
                        </select>
                    </label>
                    <label>Area:
                        <input type="text" value={filters.area} onChange={(e) => this.handleFilterChange('area', e.target.value)} />
                    </label>
                </div>
                {weather && (
                    <div className="weather-info">
                        <h2>Weather in {weather.name}: {weather.weather[0].main}</h2>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                    </div>
                )}
                {Array.isArray(filteredHotels) && filteredHotels.map((hotel, index) => (
                    <div key={index} className="hotel-card" onClick={() => this.handleHotelClick(hotel.id)}>
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
        )
    }
}

const HomePageWithLocation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return <HomePage location={location} navigate={navigate} />
}

export default HomePageWithLocation;