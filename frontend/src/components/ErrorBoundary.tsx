import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: '8rem',
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Oops!
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Something went wrong
        </Typography>
        {error && (
          <Typography
            variant="body2"
            sx={{
              p: 2,
              bgcolor: 'error.main',
              color: 'error.contrastText',
              borderRadius: 1,
              mb: 4,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {error.message}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          Return to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorBoundary;