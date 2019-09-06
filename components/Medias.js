import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ButtonBase from '@material-ui/core/ButtonBase';

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
  tileBtn: {
    display: 'block',
    textAlign: 'initial'
  }
}));

export default function Media(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  function GridListTileLink(props) {
    return (
    <Link href="/medias/[id]" as={`/medias/${props.slug}`}>
      <GridListTile button component="a" {...props} />
    </Link>
    )
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={labelProps.size==="large" ? 350 : 150} cols={labelProps.size==="large" ? 3 : 2} className={classes.gridList} spacing={0}>
        {props.mediafolders.map(mediafolder => (
            <ButtonBase key={mediafolder.id} className={classes.tileBtn}>
              <GridListTileLink slug={mediafolder.slug}>
                <img src={mediafolder.couverture} alt={mediafolder.title} />
                <GridListTileBar title={mediafolder.title} />
              </GridListTileLink>
            </ButtonBase>
        ))}
      </GridList>
    </div>
  );
}