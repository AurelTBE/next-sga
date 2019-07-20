import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from './AppBar';

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
 },
 typography: { 
    useNextVariants: true
 }
});

const Layout = props => (
  <ThemeProvider theme={theme}>
    <AppBar />
    {props.children}
  </ThemeProvider>
);



export default Layout;