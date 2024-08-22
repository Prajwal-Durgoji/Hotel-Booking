
import React, { PureComponent } from 'react'
import './SellerPage.css'
import { useLocation } from 'react-router-dom';

class SellerPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hotelName: '',
            price: '',
            imageUrl: '',
            checkInDate: '',
            checkOutDate: '',
            amenities: [],
            location: '',
            hotelInformation: '',
            nearby: [],
            area: '',
            roomOption: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAmenitiesChange = (event) => {
        this.setState({
            amenities: event.target.value.split(',')
        });
    }

    handleNearbyChange = (event) => {
        this.setState({
            nearby: event.target.value.split(',')
        });
    }

    componentDidMount() {
        console.log('Location prop:', this.props.location);
        const { sellerId, sellerEmail } = this.props.location.state || {};

        console.log('Seller ID:', sellerId);
        this.setState({ sellerId, sellerEmail });

    }


    formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const checkInDateFormatted = this.formatDate(this.state.checkInDate);
        const checkOutDateFormatted = this.formatDate(this.state.checkOutDate);

        const token = localStorage.getItem('authToken');

        // Send a request to the add property endpoint
        const response = await fetch('http://localhost:8080/api/hotels/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                hotelName: this.state.hotelName,
                price: this.state.price,
                imageUrl: this.state.imageUrl,
                checkInDate: checkInDateFormatted,
                checkOutDate: checkOutDateFormatted,
                amenities: this.state.amenities.map(amenity => ({ amenity: amenity.trim() })),
                location: this.state.location,
                hotelInformation: this.state.hotelInformation,
                nearby: this.state.nearby.map(place => ({ place: place.trim() })),
                area: this.state.area,
                roomOption: this.state.roomOption
            }),
        });

        if (response.ok) {
            this.setState({
                hotelName: '',
                price: '',
                imageUrl: '',
                checkInDate: '',
                checkOutDate: '',
                amenities: [],
                location: '',
                hotelInformation: '',
                nearby: [],
                area: '',
                roomOption: ''
            });

            alert('Property added successfully');
        } else {
            alert('Failed to add property');
        }
    }

    render() {
        return (
            <div className="seller-page">
                <h1>Add Property</h1>

                <form onSubmit={this.handleSubmit} className="seller-form">
                    <div className="form-group">
                        <label>Hotel Name:</label>
                        <input type="text" name="hotelName" onChange={this.handleInputChange} value={this.state.hotelName} />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text" name="price" onChange={this.handleInputChange} value={this.state.price} />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input type="text" name="imageUrl" onChange={this.handleInputChange} value={this.state.imageUrl} />
                    </div>
                    <div className="form-group">
                        <label>Check-in Date:</label>
                        <input type="date" name="checkInDate" onChange={this.handleInputChange} value={this.state.checkInDate} />
                    </div>
                    <div className="form-group">
                        <label>Check-out Date:</label>
                        <input type="date" name="checkOutDate" onChange={this.handleInputChange} value={this.state.checkOutDate} />
                    </div>
                    <div className="form-group">
                        <label>Amenities:</label>
                        <input type="text" name="amenities" onChange={this.handleAmenitiesChange} value={this.state.amenities.join(',')} placeholder="Enter amenities separated by commas" />
                    </div>
                    <div className="form-group">
                        <label>Room Option:</label>
                        <input type="text" name="roomOption" onChange={this.handleInputChange} value={this.state.roomOption} />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input type="text" name="location" onChange={this.handleInputChange} value={this.state.location} />
                    </div>
                    <div className="form-group">
                        <label>Nearby:</label>
                        <input type="text" name="nearby" onChange={this.handleNearbyChange} value={this.state.nearby.join(',')} placeholder="Enter nearby places separated by commas" />
                    </div>
                    <div className="form-group">
                        <label>Area:</label>
                        <input type="text" name="area" onChange={this.handleInputChange} value={this.state.area} />
                    </div>
                    <div className="form-group">
                        <label>Hotel Information:</label>
                        <textarea name="hotelInformation" onChange={this.handleInputChange} value={this.state.hotelInformation} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}

const SellerPageWrapper = () => {
    const location = useLocation();
    return <SellerPage location={location} />
}

export default SellerPageWrapper;