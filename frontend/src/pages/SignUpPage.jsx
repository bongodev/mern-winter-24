import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Typography, TextField, Button, Box } from '@mui/material';

import { userServices } from '../api/services';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    userType: 'customer', // Default user type
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TO DO email verification
    userServices
      .createUser(formData)
      .then(() => navigate('/login'))
      .catch((err) => {
        alert('Failed to sing-up');
        console.error(err);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign Up - Simple E-Commerce
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="First Name"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};
