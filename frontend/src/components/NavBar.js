
import React, { Component, useContext } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import { UsernameContext } from '../helpers/UsernameContext';

class NavBar extends Component {
    handleLoginClick = () => {
        this.props.navigate('/login');
    };

    handleLogoutClick = () => {
        localStorage.removeItem('authToken'); // Remove the token from local storage
        this.props.setUsername(''); // Clear the username in the context
        this.props.navigate('/'); // Navigate to the home page
    };

    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username) {
            this.forceUpdate(); 
        }
    }

    handleLogoClick = () => {
        this.props.navigate('/');
    };

    render() {
        const { username } = this.props;
        return (
            <nav className="navbar">
                <h1 className="navbar-heading" onClick={this.handleLogoClick}>Rentify</h1>
                <div className="button-group">
                    {!username ? (
                        <button className='custom-btn btn-9' onClick={this.handleLoginClick}>Login/SignUp</button>
                    ) : (
                        <button className='custom-btn btn-9' onClick={this.handleLogoutClick}>Logout</button>
                    )}
                </div>
                {username && <div className="username-display">Welcome, {username}!</div>}
            </nav>
        );
    }
}

const NavBarWithNavigate = () => {
    const navigate = useNavigate();
    const { username, setUsername } = useContext(UsernameContext);
    console.log("Username: ", username);
    return <NavBar navigate={navigate} username={username} setUsername={setUsername} />;
}

export default NavBarWithNavigate;