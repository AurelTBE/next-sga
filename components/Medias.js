import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Link from 'next/link';

// MUI
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Media(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={450} >
        {props.mediafolders.map(mediafolder => (
          <GridListTile key={mediafolder.id}>
            <img src={mediafolder.couverture} alt={mediafolder.title} />
            <GridListTileBar title={mediafolder.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}