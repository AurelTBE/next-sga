import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { reauthenticate } from '../redux/actions/authActions';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
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
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    media: {
      maxWidth: "100%",
    },
    content: {
      textAlign: 'left',
      '& figure': {
        textAlign: 'center',
      },
    }
  }));

function Authentification(props) {
  const classes = useStyles();
  const isLoggedIn = props.authentication.token
  
  useEffect(() => {
    const {router} = props
    if(isLoggedIn) {
      router.back();
    }
  }, [])

  if(isLoggedIn) {
    return null
  } else {
    return (
      <Layout>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zone privée
          </Typography>
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={1} direction="column" alignItems="center">
                  <Box mt={2} pb={2}>
                    Pour accéder à cette zone, vous devez vous connecter. Si vous n'avez pas de compte, vous pouvez en créer un, ou retourner à l'accueil.
                  </Box>
                  <Grid item>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      aria-label="full-width contained primary button group"
                    >
                      <Button href="/connexion">Connexion</Button>
                      <Button href="/inscription">Inscription</Button>
                      <Button href="/">Accueil</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Layout>
    )
  }
}

export default withRouter(connect(
  state => state,
  )(Authentification));