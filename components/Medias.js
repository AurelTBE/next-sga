import React from 'react';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import Link from 'next/link';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Masonry
import Masonry from 'react-masonry-css';

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
  icon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: theme.palette.background.paper,
    fontSize: 60,
    [theme.breakpoints.down('sm')]: {
      fontSize: 38,
    },
  },
}));

const fetcher = url => fetch(url).then(r => r.json())

export default function Media(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, error } = useSWR('https://sga-gymfeminine.fr/bo/wp-json/sga/v1/mediatheque', fetcher)

  const breakpointColumnsObj = {
    default: 5,
    1750: 4,
    959: 3,
    500: 2
  };

  if (error) return <div>Impossible de charger les galeries...</div>
  if (!data) return <div>Chargement des galeries...</div>
  return (
    <div className={classes.root}>
      <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn}>
        {data.map(mediafolder => {
          if(mediafolder.media == "Photos") {
            return (
              <Link href="/medias/[id]" as={`/medias/${mediafolder.slug}`} key={mediafolder.id}>
                <ButtonBase component="a">
                  <img src={mediafolder.couverture} alt={mediafolder.title} className={classes.image} />
                  <Box className={classes.caption} width={1}><Typography variant={ isSmallScreen ? "subtitle2" : "h6" } className={classes.captiontext}>{mediafolder.title}</Typography></Box>
                </ButtonBase>
              </Link>
            )}            
          else if(mediafolder.media == "Vidéos") {
            return (
              <Link href="/medias/[id]" as={`/medias/${mediafolder.slug}`} key={mediafolder.id}>
                <ButtonBase component="a">
                  <img src={mediafolder.couverture} alt={mediafolder.title} className={classes.image} />
                  <Box className={classes.caption} width={1}><Typography variant={ isSmallScreen ? "subtitle2" : "h6" } className={classes.captiontext}>{mediafolder.title}</Typography></Box>
                  <PlayCircleOutlineIcon className={classes.icon} />
                </ButtonBase>
              </Link>
            )
          }  
        })}
      </Masonry>
    </div>
  );
}