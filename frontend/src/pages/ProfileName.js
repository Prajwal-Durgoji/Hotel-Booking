import { PureComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileName.css';

class ProfileNameClass extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            age: ""
        }
    }

    
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleClick = () => {
        this.props.navigate("/hobbies-interests", { state: { name: this.state.name, age: this.state.age } });
    }

    render() {
        return (
            <div className="container-name">
                <h1 className="heading">Create your Profile</h1>
                <label className="label-gap">
                    <input type="text" name="name" className="input-field" placeholder="Enter your name" onChange={this.handleInputChange} />
                </label>
                <label>
                    <input type="number" name="age" className="input-field" placeholder="Enter your age" onChange={this.handleInputChange} />
                </label>
                <button type="button" className='profile-name' onClick={this.handleClick}>
                    Next Step
                </button>
            </div>
        )
    }
}

const ProfileName = () => {
    const navigate = useNavigate();
    return <ProfileNameClass navigate={navigate} />
}

export default ProfileName;