
import React, { Component } from 'react';
import './PopularDestinations.css';
import SkeletonLoader from '../helpers/SkeletonLoader';

class PopularDestinations extends Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        // Simulate an API call
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000); // Adjust the timeout as needed
    }


    render() {  
        const { loading } = this.state;

        if (loading) {
            return <SkeletonLoader />;
        }
        return (
            <div className="popular-destinations">
                <h2>Popular Destinations</h2>
                <p>We have selected some best locations around the world.</p>
                <div className="city-cards1">
                    <div className="city-card">
                        <img src="/images/mumbai.jpeg" alt="City 1" />
                        <div className="image-text">Mumbai</div>
                        <div className="image-subtext">Financial Capital of India</div>
                    </div>
                    <div className="city-card-side">
                        <img src="/images/Paris.jpeg" alt="City 2" />
                        <div className="image-container">
                            <img src="/images/Paris.jpeg" alt="City 3" />
                        </div>
                    </div>
                    <div className="city-card-side-side">
                        <img src="/images/Krabi.jpeg" alt="City 4" />
                        <div className="image-container">
                            <img src="/images/maldives.jpeg" alt="City 5" />
                        </div>
                    </div>
                </div>
                <div className="city-cards2">
                    <div className="city-card-side">
                        <img src="/images/Dubai.jpeg" alt="City 6" />
                        <div className="image-container">
                            <img src="/images/Amsterdam.jpeg" alt="City 7" />
                        </div>
                    </div>
                    <div className="city-card-side-side">
                        <img src="/images/Amritsar.jpeg" alt="City 8" />
                        <div className="image-container">
                            <img src="/images/Hyderbad.jpeg" alt="City 9" />
                        </div>
                    </div>
                    <div className="city-card">
                        <img src="/images/Manali.jpeg" alt="City 10" />
                    </div>
                </div>
                <div className="city-cards3">
                    <div className="city-card-side">
                        <img src="/images/Shimla.jpeg" alt="City 11" />
                        <div className="image-container">
                            <img src="/images/Singapore.jpeg" alt="City 12" />
                        </div>
                    </div>
                    <div className="city-card">
                        <img src="/images/Munnar.jpeg" alt="City 13" />
                    </div>
                    <div className="city-card-side-side">
                        <img src="/images/Mysore.jpeg" alt="City 14" />
                        <div className="image-container">
                            <img src="/images/Udaipur.jpeg" alt="City 15" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopularDestinations;
