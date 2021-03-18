import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: red.A400,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h1: {
      color: '#555',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h6: {
      color: '#555',
      fontWeight: 'bold',
      fontSize: 18,
    },
    body1: {
      color: '#555',
    },
  },
});

export default theme;
