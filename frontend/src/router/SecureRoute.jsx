import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { useUserSession } from '../api/hooks';

export const SecureRoute = ({ children }) => {
  const navigate = useNavigate();

  const { userSession } = useUserSession();

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }
  }, [navigate, userSession]);

  if (userSession) {
    return children;
  }

  return <CircularProgress sx={{ mt: 6 }} />;
};
