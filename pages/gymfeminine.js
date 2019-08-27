import Layout from '../components/Layout'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import CardBenevole from '../components/CardBenevole';

import fetch from 'isomorphic-unfetch';

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

export default function GymFeminine(props) {
    const classes = useStyles();
    const { benevoles } = props;
    return (
        <Layout>
            <Grid container justify="center" alignItems="stretch" alignContent="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Organisation
                    </Typography>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Bénévoles :
                    </Typography>
                </Grid>
                {benevoles.map((benevole) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={benevole.id}>
                        <Typography component="h3" variant="h3" gutterBottom>
                          {benevole.acf.nom_du_benevole}
                        </Typography>
                        <Typography component="div" variant="body1" gutterBottom>
                          {benevole.acf.informations_sur_le_benevole}
                        </Typography>
                        <CardBenevole benevole={benevole} />
                      </Grid>
                    ))}
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