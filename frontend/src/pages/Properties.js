import React, { PureComponent } from 'react'
import './Properties.css'

class Properties extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hotels: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/hotels/hotel-details')
            .then(response => response.json())
            .then(hotels => this.setState({ hotels }));
    }

    handleHotelClick = (hotelId) => {
        // Navigate to the hotel details page
        // This depends on how your routing is set up
        // For example, if you're using react-router:
        this.props.history.push(`/hotel-details/${hotelId}`);
    }

    render() {
        return (
            <div className="container-hotel">
                <h1>Properties</h1>
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

export default Properties;