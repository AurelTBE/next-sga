import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch';
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Organisation(props) {
    const classes = useStyles();
    const { benevoles } = props;
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Organisation
                    </Typography>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Bénévoles :
                    </Typography>
                    
                    {benevoles.map((benevole) => (
                      <div key={benevole.id}>
                        <Typography component="h3" variant="h3" gutterBottom>
                          {benevole.acf.nom_du_benevole}
                        </Typography>
                        <Typography component="div" variant="body1" gutterBottom>
                          {benevole.acf.informations_sur_le_benevole}
                        </Typography>
                      </div>
                    ))}
                </Grid>
            </Grid>
        </Layout>
    )
}

Organisation.getInitialProps = async function() {
    const res = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/wp/v2/benevoles`);
    const benevoles = await res.json();
  
    return {
        benevoles: benevoles
    };
  };