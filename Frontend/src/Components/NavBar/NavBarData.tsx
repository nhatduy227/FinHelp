import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

export const NavBarData = [
  {
    title: 'Portfolio',
    path: '/',
    icon: <BusinessCenterOutlinedIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: <HomeOutlinedIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Analytics',
    path: '/Analytics',
    icon: <AnalyticsOutlinedIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Live Market',
    path: '/LiveMarket',
    icon: <ShowChartOutlinedIcon />,
    cName: 'nav-text'
  },
  
];