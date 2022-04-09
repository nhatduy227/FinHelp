import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';

import App from './App';
import theme from './theme/theme';

const container = document.getElementById('root');

//Initial render
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    container
);

