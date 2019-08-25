import Layout from '../components/Layout'
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

export default function PageName() {
    const classes = useStyles();
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Page content
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
    )
}