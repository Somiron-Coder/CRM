import React, { useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Fade, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SEO } from './SEO';

// Page titles mapping
const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/employees': 'Employee Management',
  '/clients': 'Client Management',
  '/projects': 'Project Management',
  '/revenue': 'Revenue Analytics',
};

const Layout: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Get current page title
  const pageTitle = PAGE_TITLES[location.pathname] || 'CRM Management';
  
  // Memoize the layout content to prevent unnecessary re-renders
  const renderLayoutContent = useCallback(() => (
    <Container 
      maxWidth="lg" 
      sx={{ 
        height: '100%',
        pt: { xs: 2, sm: 3 },
        pb: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
        transition: theme.transitions.create(['padding'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Outlet />
    </Container>
  ), []);

  React.useEffect(() => {
    setMounted(true);
    
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title={pageTitle}
        description={`Manage your ${pageTitle.toLowerCase()} efficiently with our modern CRM solution`}
      />
      <Box 
        sx={{ 
          display: 'flex', 
          bgcolor: 'background.default', 
          minHeight: '100vh',
          transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Navbar />
        <Sidebar />
        <Fade 
          in={mounted} 
          timeout={500}
          style={{
            transitionDelay: '100ms',
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              ml: isMobile ? 0 : 0,
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: `linear-gradient(180deg, ${theme.palette.primary.main}0A 0%, ${theme.palette.background.default} 100%)`,
                zIndex: 0,
              },
            }}
          >
            {renderLayoutContent()}
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default React.memo(Layout);