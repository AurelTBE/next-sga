import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Link from 'next/link';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Masonry
import Masonry from 'react-masonry-css';

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
  masonryGrid: {
    display: 'flex',
    marginLeft: 0,
    width: "100%",
  },
  masonryColumn: {
    paddinLeft: 0,
  },
  image: {
    position: "relative",
    width: "100%",
    height: "auto"
  },
  caption: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: theme.palette.background.paper,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
  },
  captiontext: {
    paddingLeft: 10,
  },
}));

export default function Media(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    700: 2,
    500: 1
  };

  return (
    <div className={classes.root}>
      <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn} p={0}>
        {props.mediafolders.map(mediafolder => (
          <Link href="/medias/[id]" as={`/medias/${mediafolder.slug}`} key={mediafolder.id}>
            <ButtonBase component="a" className={classes.tileBtn}>
                <img src={mediafolder.couverture} alt={mediafolder.title} className={classes.image} />
                <Box className={classes.caption} width={1}><Typography variant="h6" className={classes.captiontext}>{mediafolder.title}</Typography></Box>
            </ButtonBase>
          </Link>
        ))}
      </Masonry>
    </div>
  );
}