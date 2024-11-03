import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Typography, TextField, Button, Box } from '@mui/material';

import { authServices } from '../api/services';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'email',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authServices
      .login(formData)
      .then(({ data }) => {
        authServices.saveUserSession(data);
        navigate('/');
      })
      .catch((err) => {
        alert(err.response.data.message || 'Login failed');
      });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login - Simple E-Commerce
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate('/signup')}
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};
