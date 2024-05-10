import React, { PureComponent } from 'react'
import './HobbiesInterest.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

class HobbiesInterestClass extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name: props.location?.state?.name || "",
            age: props.location?.state?.age || "",
            hobbies: []
        }
    }

    componentDidMount() {
        console.log(`Name: ${this.state.name}`);
        console.log(`Age: ${this.state.age}`);
    }

    
    handleCheckboxChange = (event) => {
        if (event.target.checked) {
            this.setState(prevState => ({
                hobbies: [...prevState.hobbies, event.target.getAttribute('data-name')]
            }));
        } else {
            this.setState(prevState => ({
                hobbies: prevState.hobbies.filter(hobby => hobby !== event.target.getAttribute('data-name'))
            }));
        }
    }

    
    handleSaveClick = () => {
        // Send a request to the server with the name, age, and selected hobbies and interests
        fetch('http://localhost:8080/api/hotels/savedetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => {
            if (response.ok) {
                console.log('Data saved successfully');
                swal("Success", "You successfully created profile", "success")
                this.props.navigate('/'); // Redirect to the landing page
            } else {
                console.log('Error saving data');
            }
            return response.text().then(text => text ? JSON.parse(text) : {})
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }



    render() {
        return (
            <div className="container1">
                <h1 className="heading1">What is your interest?</h1>
                <div className="hobbies-interests">
                    <div>
                        <input type="checkbox" data-name="Blogging" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Art" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Writing" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Dance" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="PhotoGraphy" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Travel" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Music" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Reading" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Cooking" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Sports" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Gaming" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Gardening" className="checkbox" onChange={this.handleCheckboxChange} />
                        <input type="checkbox" data-name="Craft" className="checkbox" onChange={this.handleCheckboxChange} />
                    </div>
                </div>
                <button type="button" className="button-interest" onClick={this.handleSaveClick}>Save</button>
            </div>
        )
    }
}


const HobbiesInterest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return <HobbiesInterestClass location={location} navigate={navigate} />
}

export default HobbiesInterest;