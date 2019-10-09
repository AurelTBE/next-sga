import Layout from '../components/Layout'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    title: {
      paddingBottom: 40,
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 0,
      }
    },
    media: {
      maxWidth: "100%",
    },
    content: {
      textAlign: 'center',
      '& figure': {
        textAlign: 'center',
      },
    }
  }));

export default function Archives() {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
              <Grid container justify="center" className={classes.title}>
                <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
                  <Typography component="h2" variant={isSmallScreen ? "h4" : "h2"} color="primary">
                    Archives
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} className={classes.content}>
                <Typography gutterBottom>
                  Cette page est en travaux, vous trouverez prochainements les anciens articles archivés ici...
                  <div>Un peu de patience <FontAwesomeIcon icon={faSmileBeam} /></div>
                </Typography>
              </Grid>
            </Grid>
        </Layout>
    )
}