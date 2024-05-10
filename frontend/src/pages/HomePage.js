
import React, { PureComponent } from 'react'
import { useLocation } from 'react-router-dom';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

class HomePage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            hotels: []
        }
    }

    componentDidMount() {
        const locationState = this.props.location.state;
        if (locationState) {
            this.setState({ hotels: locationState });
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
                {Array.isArray(this.state.hotels) && this.state.hotels.map((hotel, index) => (
                    <div key={index} className="hotel-card" onClick={() => this.handleHotelClick(hotel.id)}>
                    <img src={`http://localhost:8080/${hotel.imageUrl}`} alt={hotel.hotelName} />
                    <div className="hotel-info">
                        <h2>{hotel.hotelName}</h2>
                        <p>Price: ₹{hotel.price}</p>
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