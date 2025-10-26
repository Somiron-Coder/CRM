import React from 'react';
import { Alert } from '@mui/material';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <Alert severity="error" sx={{ my: 2 }}>
    {message}
  </Alert>
);