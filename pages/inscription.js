import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Layout from '../components/Layout'
import axios from 'axios';

// Signup message
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Authenticate after signup
import { connect } from 'react-redux';
import { postsignup } from '../redux/actions/authActions';

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

function Inscription({ postsignup }) {
  const classes = useStyles();
  const theme = useTheme();

  const [display_name, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [informations, setInformations] = useState('');
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
    const user = { username, password };
    postsignup(user)
  }

  const insertData = nonce => {
    axios.post(`https://sga-gymfeminine.fr/bo/api/user/register/?username=${username}&email=${email}&nonce=${nonce}&display_name=${display_name}&description=${informations}&user_pass=${password}&insecure=cool`)
    .then(function (response) {
      response.data.status !== "error" && handleClickOpen()
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  const getWPnonce = () => {
    axios.get('https://sga-gymfeminine.fr/bo/api/get_nonce/?controller=user&method=register')
    .then(res => {
      insertData(res.data.nonce)
    })
    .catch(error => {
      console.log(error.response)
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    getWPnonce()
  };

  return (
    <Layout>
      <Container component="main" maxWidth="sm">
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
            <Box mt={2}>
              Afin de nous aider à t'identifier, pour te donner les accès aux rubriques du site qui te seront utile, explique nous en quelques mots qui tu es, et ton lien avec le club.
            </Box>
            <Box mt={1}>
              Exemple : "Je suis X, adhérente, je m'entraine dans le groupe X..." ou "Je suis la maman de X qui est adhérente..."
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rowsMax="4"
              id="informations"
              label="Informations"
              name="informations"
              value={informations}
              onChange={e => setInformations(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? "Inscription" : "S'inscrire"}
            </Button>
          </form>
        </div>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{`Bienvenue ${display_name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ton compte vient d'être créé. Tu n'a pas encore accès à toutes les zones du site, car nous devons d'abord vérifier que tu es bien adhérent au club, parent d'un adhérent ou bénévole. 
            Tu peux continuer ta navigation en attendant que l'on te donne les accès.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Continuer
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default connect(
  state => state,
  { postsignup }
)(Inscription); 