
import React, { PureComponent } from 'react'
import { useLocation } from 'react-router-dom';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

class HomePage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            hotels: [],
        }
    }

    componentDidMount() {
        const locationState = this.props.location.state;
        if (locationState) {
            this.setState({ hotels: locationState.hotels });
            // this.setState({ hotels: locationState.hotels, weather: locationState.weather });
            console.log("HomePage state:", locationState);
        }
    }


    handleHotelClick = (hotelId) => {
        this.props.navigate("/hotel-details", { state: hotelId });
        console.log("Navigating to hotel details for hotelId:", hotelId);
    }

    render() {
        return (
            <div className="container-hotel">
                {/* {this.state.weather && this.state.weather.location && (
                    <div className="weather-info">
                        <h2>Weather in {this.state.weather.location.name}</h2>
                        <p>{this.state.weather.current.condition.text}</p>
                        <p>Temperature: {this.state.weather.current.temp_c}°C</p>
                    </div>
                    )} */}
                {Array.isArray(this.state.hotels) && this.state.hotels.map((hotel, index) => (
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