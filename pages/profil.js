import Layout from '../components/Layout'
import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';
import { deauthenticate } from '../redux/actions/authActions';
import withAuth from '../utils/withAuth';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
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

function Profil({name, role, deauthenticate}) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
      setLoading(true);
      deauthenticate()
    }
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Profil
                    </Typography>
                    {name ? <Typography component="div" variant="body1" gutterBottom>
                      Bonjour {name}, bienvenue sur ton profil. {role.includes("subscriber") ? "Tu es en attente de validation de ton compte" : `Tu as un accès ${role}`}
                    </Typography> : null}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleLogout}
                    >
                      {loading ? "Déconnexion" : "Se déconnecter"}
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

const mapStateToProps = state => ({ 
  name: state.authentication.token.user_display_name,
  role: state.authentication.token.user_role,
 });

export default withAuth()(connect(
  mapStateToProps,
  { deauthenticate }
)(Profil));