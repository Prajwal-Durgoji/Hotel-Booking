
import React, { Component, useContext } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import { UsernameContext } from '../helpers/UsernameContext';

class NavBar extends Component {
    handleLoginClick = () => {
        this.props.navigate('/login');
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
                    <button className='custom-btn btn-9' onClick={this.handleLoginClick} disabled={!!username}>Login/SignUp</button>
                </div>
                {username && <div className="username-display">Welcome, {username}!</div>}
            </nav>
        );
    }
}

const NavBarWithNavigate = () => {
    const navigate = useNavigate();
    const { username } = useContext(UsernameContext);
    console.log("Username: ", username);
    return <NavBar navigate={navigate} username={username} />;
}

export default NavBarWithNavigate;