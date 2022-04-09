import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

//currently supported ticker
export const TickerColor = {
    "AAPL": {
        logo: <AppleIcon style={{ color: 'white' }} />,
        color: "linear-gradient(200deg, #000000, #676767)"
    },
    "FB": {
        logo: <FacebookIcon style={{ color: 'white' }} />,
        color: "linear-gradient(200deg, #5CE2FF, #0038FF)"
    },
    "TWTR": {
        logo: <TwitterIcon style={{ color: 'white' }} />,
        color: "linear-gradient(200deg, #5CE2FF, #80B2BD)"
    },
    "GOOG": {
        logo: <GoogleIcon style={{ color: 'white' }} />,
        color: "linear-gradient(200deg, #E7EB26, #FF5C00)"
    }
}
