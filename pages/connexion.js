import Layout from '../components/Layout'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Connexion from '../components/Connexion';
import Inscription from '../components/Inscription';

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

export default function Medias() {
    const classes = useStyles();
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h1" variant="h2" gutterBottom>
                        Connexion
                    </Typography>
                    <Connexion />
                    <Inscription />
                </Grid>
            </Grid>
        </Layout>
    )
}