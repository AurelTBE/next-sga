import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button'

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
  gridList: {
    width: "100%",
    height: "auto",
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
      <GridList cellHeight={labelProps.size==="large" ? 350 : 250} cols={labelProps.size==="large" ? 3 : 1} className={classes.gridList} spacing={0}>
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