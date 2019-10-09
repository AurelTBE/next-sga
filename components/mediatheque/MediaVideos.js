import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import Link from 'next/link';
import { connect } from 'react-redux';

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
  
function MediaVideos({galinfos}) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const breakpointColumnsObj = {
      default: 5,
      1750: 4,
      959: 3,
      500: 2
    };
  
    return (
      <div className={classes.root}>
        <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn}>
            {galinfos.map(mediafolder => 
                <Link href="/medias/[id]" as={`/medias/${mediafolder.slug}`} key={mediafolder.id}>
                  <ButtonBase component="a">
                    <img src={mediafolder.couverture} alt={mediafolder.title} className={classes.image} />
                    <Box className={classes.caption} width={1}><Typography variant={ isSmallScreen ? "subtitle2" : "h6" } className={classes.captiontext}>{mediafolder.title}</Typography></Box>
                    <PlayCircleOutlineIcon className={classes.icon} />
                  </ButtonBase>
                </Link>
            )}
        </Masonry>
      </div>
    );
  }

  const mapStateToProps = state => ({ 
    galinfos: state.mediatheque.videos,
   });
  
   export default connect(
    mapStateToProps
  )(MediaVideos); 