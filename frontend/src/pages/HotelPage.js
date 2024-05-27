import React, { PureComponent } from 'react'
import './HotelPage.css'
import { useLocation } from 'react-router-dom';

class HotelPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hotel: null
        }
    }

    componentDidMount() {
        const hotelId = this.props.location.state;

        // Fetch the hotel information and amenities
        fetch(`http://localhost:8080/api/hotels/hotel-details/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ hotel: data });
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div>
                {this.state.hotel && (
                    <div className='hotel-page-container'>
                        <h2>{this.state.hotel.hotelName}</h2>
                        <p>{this.state.hotel.hotelInformation}</p>
                        <div className="amenities-container">
                            {this.state.hotel.amenities && this.state.hotel.amenities.map((amenity, index) => (
                                <p key={index}>{amenity.amenity}</p>
                            ))}
                        </div>
                        <button className='ava-button'>See Availability</button> 
                    </div>
                )}
            </div>
        )
    }
}

const HotelPageBox = () => {
    const location = useLocation();
    return <HotelPage location={location} />
}

export default HotelPageBox