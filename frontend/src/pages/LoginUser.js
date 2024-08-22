import React, { Component, useContext } from 'react';
import './LoginUser.css'
import { useNavigate } from 'react-router-dom';
import { UsernameContext } from '../helpers/UsernameContext';

class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/api/hotels/login/seller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sellerEmail: this.state.username,
        sellerPassword: this.state.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login response:', data);
      localStorage.setItem('authToken', data.token); // Save the token to local storage
      this.props.setUsername(this.state.username);
      this.props.navigate('/seller', { state: { sellerId: data.sellerId, sellerEmail: data.sellerEmail } });
    } else {
      alert('Invalid username or password');
    }
  }

  render() {
    return (
      <UsernameContext.Consumer>
        {({ setUsername }) => (
          <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input type="text" name="username" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" onChange={this.handleInputChange} />
              </div>
              <input className="submit-button" type="submit" value="Submit" />
            </form>
          </div>
        )}
      </UsernameContext.Consumer>
    );
  }
}

const LoginUserWithNavigate = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(UsernameContext);
  return <LoginUser navigate={navigate} setUsername={setUsername} />;
};

export default LoginUserWithNavigate;