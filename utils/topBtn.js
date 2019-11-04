import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollPosition from "../utils/useScrollPosition";
import { NoSsr } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();
  const scrollPos = useScrollPosition();
  
  function handleClickTop() {
    window.scrollTo(0, 0);
  }

  return (
    <NoSsr>
      <Zoom in={scrollPos >= 64}>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => handleClickTop()}>
          <UpIcon />
        </Fab>
      </Zoom>
    </NoSsr>
  );
}