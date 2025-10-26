import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  useTheme,
  alpha,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  Support as SupportIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/',
    badge: null,
  },
  { 
    text: 'Employees', 
    icon: <PeopleIcon />, 
    path: '/employees',
    badge: '12',
  },
  { 
    text: 'Clients', 
    icon: <BusinessIcon />, 
    path: '/clients',
    badge: '8',
  },
  { 
    text: 'Projects', 
    icon: <AssignmentIcon />, 
    path: '/projects',
    badge: '5',
  },
  { 
    text: 'Revenue', 
    icon: <AttachMoneyIcon />, 
    path: '/revenue',
    badge: null,
  },
];

const secondaryMenuItems = [
  { 
    text: 'Support', 
    icon: <SupportIcon />, 
    path: '/support',
  },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    path: '/settings',
  },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize styles for better performance
  const styles = useMemo(() => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
      },
    },
    listItem: (isSelected: boolean) => ({
      borderRadius: 2,
      mx: 1,
      mb: 0.5,
      color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
      bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
      '&:hover': {
        bgcolor: isSelected 
          ? alpha(theme.palette.primary.main, 0.12)
          : alpha(theme.palette.primary.main, 0.04),
      },
    }),
    listItemIcon: (isSelected: boolean) => ({
      color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
      minWidth: 40,
    }),
    badge: {
      py: 0.25,
      px: 1,
      borderRadius: 1,
      bgcolor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      fontSize: '0.75rem',
      fontWeight: 600,
    },
  }), [theme]);

  return (
    <Drawer
      variant="permanent"
      sx={styles.drawer}
    >
      <Box sx={{ px: 3, py: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NEXUVA
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Agency CRM
          </Typography>
        </Stack>
      </Box>

      <List sx={{ px: 2, pt: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={styles.listItem(isSelected)}
            >
              <ListItemIcon sx={styles.listItemIcon(isSelected)}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    variant="body2"
                    sx={{ 
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
              {item.badge && (
                <Box component="span" sx={styles.badge}>
                  {item.badge}
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2, my: 2 }} />

      <List sx={{ px: 2 }}>
        {secondaryMenuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={styles.listItem(isSelected)}
            >
              <ListItemIcon sx={styles.listItemIcon(isSelected)}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    variant="body2"
                    sx={{ 
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Need help?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check our documentation
            </Typography>
            <Box>
              <Tooltip title="View documentation">
                <IconButton 
                  size="small"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default React.memo(Sidebar);