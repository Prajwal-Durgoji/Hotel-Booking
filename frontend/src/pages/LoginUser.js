import React, { useContext,useRef } from 'react';
import './LoginUser.css'
import { useNavigate } from 'react-router-dom';
import { UsernameContext } from '../helpers/UsernameContext';

const LoginUser = ({ setUsername, navigate }) => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const userTypeRef = useRef('seller');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      usernameRef.current = value;
    } else if (name === 'password') {
      passwordRef.current = value;
    } else if (name === 'userType') {
      userTypeRef.current = value;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameRef.current;
    const password = passwordRef.current;
    const userType = userTypeRef.current;
    const endpoint = userType === 'seller' ? 'login/seller' : 'login/buyer';
    const response = await fetch(`http://localhost:8080/api/hotels/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [`${userType}Email`]: username,
        [`${userType}Password`]: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login response:', data);
      localStorage.setItem('authToken', data.token); 
      setUsername(username);
      if (userType === 'seller') {
        navigate('/seller', { state: { sellerId: data.sellerId, sellerEmail: data.sellerEmail } });
      } else {
        navigate('/'); 
      }
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <select name="userType" onChange={handleInputChange} defaultValue="seller">
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

const LoginUserWithNavigate = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(UsernameContext);
  return <LoginUser navigate={navigate} setUsername={setUsername} />;
};

export default LoginUserWithNavigate;