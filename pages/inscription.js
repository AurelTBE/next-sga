import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Layout from '../components/Layout'
import axios from 'axios';

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
}));

export default function Inscription() {
  const classes = useStyles();

  const [display_name, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const insertData = nonce => {
    axios.post(`http://sga-gymfeminine.fr/bo/api/user/register/?username=${username}&email=${email}&nonce=${nonce}&display_name=${display_name}&user_pass=${password}&insecure=cool`)
    .then(res => {
      console.log('User inserted !', res.data)
    }).catch(error => {
      console.log(error.response)
    })
  }

  const getWPnonce = () => {
    axios.get('http://sga-gymfeminine.fr/bo/api/get_nonce/?controller=user&method=register')
    .then(res => {
      console.log(res.data)
      insertData(res.data.nonce)
    }).catch(error => {
      console.log(error.response)
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    // console.log('login with ', { username, password });
    const user = { username, email, display_name, password };
    getWPnonce()
    console.log('Inscrit avec ', user)
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FontAwesomeIcon icon={faPenAlt} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nom"
              label="Nom"
              name="nom"
              autoComplete="name"
              value={display_name}
              onChange={e => setDisplayname(e.target.value)}
              autoFocus
            />
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Inscription
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  );
}