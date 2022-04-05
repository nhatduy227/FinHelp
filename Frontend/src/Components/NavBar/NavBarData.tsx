import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

export const NavBarData = [
  {
    title: 'Dashboard',
    path: '/',
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
  }
];