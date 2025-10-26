import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { CircularProgress, Box } from '@mui/material';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
      setIsLoading(false);
    };

    initialize();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};