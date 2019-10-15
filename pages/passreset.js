import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from "next/link";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

// Redux Authentication
import { connect } from 'react-redux';
import { authenticate } from '../redux/actions/authActions';

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
}));

function PassReset() {
  const classes = useStyles();

  const [username, setUsername] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`https://sga-gymfeminine.fr/bo/api/user/retrieve_password/?user_login=${username}&insecure=cool`)
    .then(res => {
      console.log('Password reset', res.data)
    }).catch(error => {
      console.log(error.response)
    })
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Réinitialisation
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Réinitialiser
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  );
}

PassReset.getInitialProps = ctx => {};

export default connect(
  state => state,
)(PassReset);