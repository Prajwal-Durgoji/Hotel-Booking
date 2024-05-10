
import React, { Component } from 'react'
import './NavBar.css'
import { useLocation } from 'react-router-dom';

class NavBar extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {

    //     }
    // }







    render() {
        const { location } = this.props;
        const isHomePage = location.pathname === '/';

        return (
            <nav className="navbar">
                <h1 className="navbar-heading">HotelShare.com</h1>
                <div className="button-group">
                    <button className='b1' disabled={!isHomePage}>Login</button>
                    <button className='b1' disabled={!isHomePage}>Register</button>
                </div>

            </nav>
        )
    }
}

const NavBarWithLocation = () => {
    const location = useLocation();
    return <NavBar location={location} />;
}

export default NavBarWithLocation