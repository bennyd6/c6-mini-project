import React, { useState } from 'react';
import axios from 'axios';
import './signup.css'; // Import the CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const { name, email, password, phoneNumber } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/createuser', formData);
      console.log(res.data);
      const { authtoken } = res.data;

      // ✅ Save token
      localStorage.setItem('token', authtoken);

      // ✅ Redirect on success
      window.location.href = '/';
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={handleChange} />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
