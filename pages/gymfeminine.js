import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Layout from '../components/Layout'
import Benevoles from '../components/Benevoles';

import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function GymFeminine(props) {
  const classes = useStyles();
  return (
      <Layout>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={10}>
            <Typography component="h1" variant="h2" gutterBottom>
              Section féminine de la SGA
            </Typography>
            <Typography component="h2" variant="h2" gutterBottom>
              Bénévoles :
            </Typography>
          </Grid>
          <Benevoles benevoles={props.benevoles} />
        </Grid>
      </Layout>
    )
}

GymFeminine.getInitialProps = async function() {
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/wp/v2/benevoles`);
  const benevoles = await res.json();

  return {
    benevoles: benevoles
  };
};