import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Stack,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  AccountCircle,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Help as HelpIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../store/auth';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          NEXUVA Agency CRM
        </Typography>
        
        {user && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Search">
              <IconButton 
                size="medium"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton 
                size="medium"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton 
                size="medium"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Box sx={{ ml: 2 }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    p: 0.5,
                    border: `2px solid ${theme.palette.primary.main}25`,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: theme.palette.primary.main,
                    }}
                  >
                    {user.email?.[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: 220,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.08))',
                    mt: 1.5,
                    borderRadius: 2,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ py: 1.5, px: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrator
                  </Typography>
                </Box>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);