import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Link from 'next/link';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  smgridList: {
    width: 500,
    height: 450,
  },
  lggridList: {
    width: 1000,
    height: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Media(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={labelProps.size==="large" ? 350 : 160} className={labelProps.size==="large" ? classes.lggridList : classes.smgridList}>
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