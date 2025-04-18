import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      const { authtoken } = res.data;

      // ✅ Save token
      localStorage.setItem('token', authtoken);

      // ✅ Redirect on success
      window.location.href = '/';
    } catch (error) {
      console.error(error.response?.data || error.message);
      // Optionally show error to user
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;