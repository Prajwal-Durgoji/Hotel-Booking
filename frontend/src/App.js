
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBarWithNavigate from './components/NavBar';
import SearchBox from './components/SearchBox';
import PopularDestinations from './components/PopularDestinations';
import RoomOptions from './components/RoomOptions';
import HomePage from './pages/HomePage';
import HotelPage from './pages/HotelPage';
import LoginUser from './pages/LoginUser';
import { UsernameContext } from './helpers/UsernameContext';
import SellerPage from './pages/SellerPage';
import Properties from './pages/Properties';

class App extends Component {
  state = {
    username: null,
  };

  setUsername = (username) => {
    this.setState({ username });
  };
  render() {
    return (
      <UsernameContext.Provider value={{ username: this.state.username, setUsername: this.setUsername }}>
        <Router>
          <NavBarWithNavigate />
          <Routes>
            <Route path="/" element={
              <>
                <RoomOptions />
                {/*  */}
                <SearchBox />
                <PopularDestinations />
              </>
            } />
            <Route path="/home" element={<HomePage />} />
            <Route path="/hotel-details" element={<HotelPage />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/seller" element={<SellerPage />} />
            <Route path="/properties" element={<Properties />} />
            {/* <Route path="/update" element={< />} */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </UsernameContext.Provider>
    );
  }
}

export default App;