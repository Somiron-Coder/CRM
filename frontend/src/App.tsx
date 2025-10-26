import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import { AuthProvider } from './components/AuthProvider';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { LoadingSpinner as AppLoadingSpinner } from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { SEO } from './components/SEO';

// Lazy load pages with loading hints for better performance
const Login = React.lazy(() => import('./pages/Login' /* webpackChunkName: "login" */));
const Dashboard = React.lazy(() => import('./pages/Dashboard' /* webpackChunkName: "dashboard" */));
const Employees = React.lazy(() => import('./pages/Employees' /* webpackChunkName: "employees" */));
const Clients = React.lazy(() => import('./pages/Clients' /* webpackChunkName: "clients" */));
const Projects = React.lazy(() => import('./pages/Projects' /* webpackChunkName: "projects" */));
const Revenue = React.lazy(() => import('./pages/Revenue' /* webpackChunkName: "revenue" */));

// Configure React Query for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
    },
  },
});

// Loading spinner with modern styling
const LoadingSpinner = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      bgcolor: 'background.default' 
    }}
  >
    <CircularProgress 
      size={40}
      thickness={4}
      sx={{ 
        color: 'primary.main',
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        }
      }}
    />
  </Box>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "/employees",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Employees />
              </Suspense>
            ),
          },
          {
            path: "/clients",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Clients />
              </Suspense>
            ),
          },
          {
            path: "/projects",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Projects />
              </Suspense>
            ),
          },
          {
            path: "/revenue",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Revenue />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        {/* Default SEO configuration */}
        <SEO 
          title="Modern CRM System"
          description="A powerful and efficient CRM system for managing your business operations"
          keywords="CRM, management, employees, clients, projects, revenue"
        />
        <QueryClientProvider client={queryClient}>
          {/* Add React Query Devtools for development */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          )}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;