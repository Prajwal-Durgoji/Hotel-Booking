import React, { PureComponent } from 'react'
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';

class SearchBoxClass extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            checkInDate: '',
            checkOutDate: ''
        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });

    }

    handleClick = async () => {
        const { location, checkInDate, checkOutDate } = this.state;

        // Convert dates to dd/MM/yyyy format
        const checkInDateFormatted = this.formatDate(checkInDate);
        const checkOutDateFormatted = this.formatDate(checkOutDate);

        const response = await fetch(`http://localhost:8080/api/hotels/search?location=${location}&checkInDate=${checkInDateFormatted}&checkOutDate=${checkOutDateFormatted}`);
        const data = await response.json();
        this.props.navigate("/home", { state: data });  //navigate home page with data
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    render() {
        return (
            <div>
                <div className="search-box">
                    <div className="search-box__text">
                        <h2>Book Rental Rooms</h2>
                    </div>
                    <div className="rooms-options">
                        {/* <div className="rooms-option">
                            <input type="radio" id="share" name="room" value="share" />
                            <label htmlFor="share">Share a room</label>
                        </div>
                        <div className="rooms-option">
                            <input type="radio" id="rent" name="room" value="rent" />
                            <label htmlFor="rent">Rent a room</label>
                        </div> */}
                    </div>
                    <div className="search-box__container">
                        <div className="search-box__input">
                            <div className="input-group">
                                <label>Where</label>
                                <select name="location" onChange={this.handleChange}>
                                    <option value="">Select a city</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                            <div className="date-inputs">
                                <div className="input-group">
                                    <label>Check-in</label>
                                    <input type="date" name="checkInDate" placeholder="Check-in date" onChange={this.handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Check-out</label>
                                    <input type="date" name="checkOutDate" placeholder="Check-out date" onChange={this.handleChange} />
                                </div>
                            </div>
                            <button type="button" className='search-button' onClick={this.handleClick}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SearchBox = () => {
    const navigate = useNavigate();
    return <SearchBoxClass navigate={navigate} />
}

export default SearchBox;

