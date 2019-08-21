import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
      primary: {
        light: '#ff6659',
        main: '#d32f2f',
        dark: '#9a0007'
    },
    secondary: {
      main: '#ffd740',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
