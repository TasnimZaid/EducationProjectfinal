import React, { useState } from 'react';
import axios from 'axios';

const RegisterS = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subject: '',
    national_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/registerS', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
      <input type="text" name="national_id" placeholder="National ID" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterS;
