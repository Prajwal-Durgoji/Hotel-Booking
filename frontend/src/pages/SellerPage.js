
import React, { PureComponent } from 'react'
import './SellerPage.css'

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


    handleViewProperties = () => {
        
        this.props.history.push('/properties');
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


        // Send a request to the add property endpoint
        const response = await fetch('http://localhost:8080/api/hotels/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            // If the request was successful, clear the form
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
            // If the request was not successful, show an error message
            alert('Failed to add property');
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to Seller Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Hotel Name:
                        <input type="text" name="hotelName" onChange={this.handleInputChange} value={this.state.hotelName} />
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" onChange={this.handleInputChange} value={this.state.price} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="imageUrl" onChange={this.handleInputChange} value={this.state.imageUrl} />
                    </label>
                    <label>
                        Check-in Date:
                        <input type="date" name="checkInDate" onChange={this.handleInputChange} value={this.state.checkInDate} />
                    </label>
                    <label>
                        Check-out Date:
                        <input type="date" name="checkOutDate" onChange={this.handleInputChange} value={this.state.checkOutDate} />
                    </label>
                    <label>
                        Amenities:
                        <input type="text" name="amenities" onChange={this.handleAmenitiesChange} value={this.state.amenities.join(',')} placeholder="Enter amenities separated by commas" />
                    </label>
                    <label>
                        Room Option:
                        <input type="text" name="roomOption" onChange={this.handleInputChange} value={this.state.roomOption} />
                    </label>
                    <label>
                        Location:
                        <input type="text" name="location" onChange={this.handleInputChange} value={this.state.location} />
                    </label>
                    <label>
                        Nearby:
                        <input type="text" name="nearby" onChange={this.handleNearbyChange} value={this.state.nearby.join(',')} placeholder="Enter nearby places separated by commas" />
                    </label>
                    <label>
                        Area:
                        <input type="text" name="area" onChange={this.handleInputChange} value={this.state.area} />
                    </label>
                    <label>
                        Hotel Information:
                        <textarea name="hotelInformation" onChange={this.handleInputChange} value={this.state.hotelInformation} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.handleViewProperties}>View Properties</button>
            </div>
        )
    }
}

export default SellerPage;