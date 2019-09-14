import Layout from '../components/Layout'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';
import { reauthenticate, getCookie } from '../redux/actions/authActions';
import Router from 'next/router';

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

function Archives({ name, user }) {
    const classes = useStyles();
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Archives
                    </Typography>
                    {(user && (
                      <div>
                        <h2>Who am i</h2>
                        {user}
                      </div>
                    )) ||
                      'Accessible aux membres du club uniquement. Connectez-vous pour voir cette page.'}
                </Grid>
            </Grid>
        </Layout>
    )
}

Archives.getInitialProps = async ctx => {
  const token = ctx.store.getState().authentication.token;
  if (token) {
    return {
      user: ctx.store.getState().authentication.token.user_display_name
    };
  }
};

export default connect(
  state => state,
  { reauthenticate }
)(Archives);