import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';

// Masonry
import Masonry from 'react-masonry-css';

// FCT
import FsLightbox from 'fslightbox-react';

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
  
function MediaPhotos({galinfos, galcovers}) {
    const classes = useStyles();
    const theme = useTheme(); 
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [lightboxController, setLightboxController] = useState({ 
      toggler: false, 
      slide: 1 
    });
      
    function openLightboxOnSlide(number) { 
      setLightboxController({ 
        toggler: !lightboxController.toggler, 
        slide: number, 
      }); 
    }

    const breakpointColumnsObj = {
      default: 5,
      1750: 4,
      959: 3,
      500: 2
    };

    return (
      <>
        <div className={classes.root}>
        <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn}>
            {galinfos.map(image => (
                <ButtonBase key={image.id} onClick={ () => openLightboxOnSlide(galinfos.indexOf(image)+1) }>
                  <img src={image.couverture} alt={image.title} className={classes.image} />
                </ButtonBase>
            ))}
          </Masonry>
            <FsLightbox 
            toggler={ lightboxController.toggler } 
            slide={ lightboxController.slide } 
            sources={ galcovers } 
            type='image'
            /> 
        </div>
      </>
    )
}

const mapStateToProps = state => ({ 
  galinfos: state.mediatheque.photos,
  galcovers: state.mediatheque.images,
 });

 export default connect(
  mapStateToProps
)(MediaPhotos);