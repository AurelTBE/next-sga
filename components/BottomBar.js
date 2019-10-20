import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faHeart } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
}));

export default function BottomBar() {
  const classes = useStyles();

  return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography>Test MAJ</Typography>
        </Grid>
        </Toolbar>
      </AppBar>
  );
}