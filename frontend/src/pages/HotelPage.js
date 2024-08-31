import './HotelPage.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const HotelPage = () => {
  const location = useLocation();
  const hotelRef = useRef(null);
  const [, setRender] = useState(false); 

  useEffect(() => {
    const hotelId = location.state;
    fetch(`http://localhost:8080/api/hotels/hotel-details/${hotelId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        hotelRef.current = data;
        setRender(prev => !prev); 
      })
      .catch(error => console.error('Error:', error));
  }, [location.state]);

  return (
    <div>
      {hotelRef.current && (
        <div className='hotel-page-container'>
          <h2>{hotelRef.current.hotelName}</h2>
          <p>{hotelRef.current.hotelInformation}</p>
          <div className="amenities-container">
            {hotelRef.current.amenities && hotelRef.current.amenities.map((amenity, index) => (
              <p key={index}>{amenity.amenity}</p>
            ))}
          </div>
          <button className='ava-button'>See Availability</button>
        </div>
      )}
    </div>
  );
};
export default HotelPage;