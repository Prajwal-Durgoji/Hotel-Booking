// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './redux/reducers';
// const store = createStore(rootReducer);


import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SearchBox from './components/SearchBox';
import PopularDestinations from './components/PopularDestinations';
import RoomOptions from './components/RoomOptions';

import HomePage from './pages/HomePage';
import Profile from './components/Profile';
import HobbiesInterest from './pages/HobbiesInterest';
import ProfileName from './pages/ProfileName';
import HotelPage from './pages/HotelPage';
// import NavBarWithLocation from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-content">
                <RoomOptions />
                <Profile />
                <SearchBox />
              </div>
              <PopularDestinations />
            </>
          } />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-name" element={<ProfileName />} />
          <Route path="/hobbies-interests" element={<HobbiesInterest />} />
          <Route path="/hotel-details" element={<HotelPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />


        </Routes>
      </Router>
    );
  }
}

export default App;
