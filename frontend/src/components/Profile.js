
import React, { PureComponent } from 'react'
import './Profile.css'

import { useNavigate } from 'react-router-dom';

class ProfileClass extends PureComponent {
    handleButtonClick = () => {
        this.props.navigate('/profile-name');
    }

    render() {
        return (
            <div className="button-container">
                <img src="/images/women.jpeg" alt="profile" />
                <button className='profile-button' onClick={this.handleButtonClick}>Create Profile</button>
            </div>
        )
    }
}

function Profile() {
    const navigate = useNavigate();
    return <ProfileClass navigate={navigate} />;
}

export default Profile;