import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import {
  PeopleAlt as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../api/dashboard';
import { DashboardStats } from '../api/types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { useAuthStore } from '../store/auth';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Paper
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }}
  >
    {icon}
    <Typography variant="h6" sx={{ mt: 2 }}>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ mt: 1 }}>
      {value}
    </Typography>
  </Paper>
);

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAuthInitialized } = useAuthStore();

  const { 
    data: stats, 
    isLoading,
    error,
    isError
  } = useQuery<DashboardStats, Error>({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    enabled: isAuthenticated && isAuthInitialized,
  });

  if (!isAuthInitialized || isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  // We can safely access stats here because we've already handled loading and error states
  const data = stats!;

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Employees"
            value={data.employees}
            icon={<PeopleIcon fontSize="large" color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Clients"
            value={data.clients}
            icon={<BusinessIcon fontSize="large" color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Projects"
            value={data.projects}
            icon={<AssignmentIcon fontSize="large" color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value={`$${data.revenue.toLocaleString()}`}
            icon={<MoneyIcon fontSize="large" color="primary" />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;