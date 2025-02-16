import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Pages/UserContext'; // Import the context
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext); // Access the setter from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateProfile = () => {
    navigate('/create-profile');
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setUserEmail(email); 
      navigate('/user-dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <div className="form-group">
          <label className="login-label">Email:</label>
          <input
            type="email"
            className="login-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            className="login-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <p onClick={handleCreateProfile} className="link">Haven't created a profile yet?</p>
      </div>
    </div>
  );
};

export default Login;
