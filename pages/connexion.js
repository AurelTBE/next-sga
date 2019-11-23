import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Link from "next/link";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Redux Authentication
import { connect } from 'react-redux';
import { authenticate, resetloggerror } from '../redux/actions/authActions';

// Connexion message
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { RingLoader } from 'react-spinners';

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  maincolor: {
    color: theme.palette.primary.main,
  },
  loader: {
    marginRight: theme.spacing(1),
  },
}));

function Connexion(props) {
  const { authenticate, resetloggerror, autherror } = props;
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameEmpt, setUsernameEmpt] = useState(false);
  const [passwordEmpt, setPasswordEmpt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function handleClose() {
    resetloggerror()
    setOpen(false)
  }


  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password };
    if(!username && !password) {
      !username && setUsernameEmpt(true)
      !password && setPasswordEmpt(true)
    } else if(!username) {
      setUsernameEmpt(true)
      setPasswordEmpt(false)
    } else if(!password) {
      setUsernameEmpt(false)
      setPasswordEmpt(true)
    }
    else {
      setUsernameEmpt(false)
      setPasswordEmpt(false)
      setLoading(true)
      authenticate(user)
    }
  };

  useEffect(() => {
    (autherror && autherror.name) && (
      setLoading(false),
      setOpen(true)
    )
  })

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth error>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Pseudo"
              name="pseudo"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            {usernameEmpt && <FormHelperText id="component-error-text">Merci de saisir votre pseudo</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {passwordEmpt && <FormHelperText id="component-error-text">Merci de saisir votre mot de passe</FormHelperText>}
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Grid item xs>
              <Link href="/passreset" passHref>
                <Typography variant="body2" component="a" color="primary">
                  Mot de passe oublié ?
                </Typography>
              </Link>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? 
              "Connexion" : "Se connecter"}
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/inscription" passHref>
                  <Typography variant="body2" component="a" color="primary">
                  {"Pas de compte ? Inscrivez-vous !"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/"
            >
              Retourner à l'accueil
            </Button>
          </form>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Informations incorrectes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pseudo et/ou mot de passe incorrect(s)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Réessayer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}

Connexion.getInitialProps = ctx => {};
const mapStateToProps = state => ({ 
  autherror: state.autherror,
 });
export default connect(
  mapStateToProps,
  { authenticate, resetloggerror }
)(Connexion);