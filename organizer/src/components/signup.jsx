import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ using useNavigate
import axios from 'axios';
import './signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organizationName: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate(); // ✅ using useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/organizer/createorganizer', formData);
      localStorage.setItem('token', res.data.authToken);
      navigate('/'); // ✅ redirect after signup
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="organizationName"
          placeholder="Organization Name"
          value={formData.organizationName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;