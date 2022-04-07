import { ListItemButton } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import theme from '../../theme/theme';
import { NavBarData } from './NavBarData';

const drawerWidth = 260;

const useStyles = makeStyles({
  root: {
    color: '#36313d',
    fontSize: 14,
    minHeight: 45,
    lineHeight: '21px',
    margin: 0,
    // left: '1rem',
    padding: '12px 48px 12px 1.5rem',
    '&:before, &:after': {
      content: '" "',
      top: '1.3em',
      height: 8,
      position: 'absolute',
      transition: 'all 250ms cubic-bezier(0.4,0,0.2,1)',
    },
    '&:before': {
      left: '0.3rem',
      width: 8,
      borderRadius: '100%',
    },
  },
  selected: {
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      // background: 'initial',
      fontWeight: 500,
      '&:before': {
        background: theme.palette.primary.main,
        transform: 'scale(1)',
      },
    },
  },
  navText: {
    fontWeight: "500"
  }
})

const NavBar = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  // const classes = ListItemStyle();
  const location = useLocation();
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderWidth: 0
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#F4F9F8",
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {NavBarData.map((item, index) => (
              <ListItemButton
                key={index}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                classes={{
                  root: classes.root,
                  selected: classes.selected
                }}
              >
                <ListItemIcon style={{ color: location.pathname === item.path ? theme.palette.primary.main : undefined }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.navText }} primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default NavBar;
