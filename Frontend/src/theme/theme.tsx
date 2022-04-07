import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#00C805',
    },
    secondary: {
      main: '#F4F9F8',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F4F9F8',
    },
  },
  typography: {
      fontFamily: 'Roboto',
      fontWeightBold: 500,
      button: {
          textTransform: 'none'
      }
  }
});