import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// Layout
import Layout from '../../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import withAuth from '../../../utils/withAuth'

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
    
function PicPrivateGalerie(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { galerieContent } = props;
    const { galerie } = galerieContent;
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  
    const [lightboxController, setLightboxController] = useState({ 
      toggler: false, 
      slide: 1 
    });

    const images = [...new Set(galerie.photos.map(photo => photo.photo))]
      
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
      <Layout>
        <Box
          display="flex" 
          color="background.paper"
          bgcolor={theme.palette.secondary.main}
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
          height={{xs: 60, md: 90}}
          width={1}
        >
          <Typography component="h2" variant={isSmallScreen ? "h6" : "h4"}>
            {galerie.title}
          </Typography>
        </Box>
        <div className={classes.root}>
          <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn}>
            {galerie.photos.map(image => (
              <ButtonBase key={image.id} onClick={ () => openLightboxOnSlide(galerie.photos.indexOf(image)+1) }>
                <img src={image.photo} alt={image.title} className={classes.image} />
              </ButtonBase>
            ))}
          </Masonry>
          <FsLightbox 
            toggler={ lightboxController.toggler } 
            slide={ lightboxController.slide } 
            sources={ images } 
            type='image'
          />
        </div>
      </Layout>
    )
}

const mapStateToProps = state => ({ 
  galerieContent: state.galeriecontent,
 });

 export default withAuth(["administrator", "cadre", "famille", "licencie"])(connect(
  mapStateToProps
)(PicPrivateGalerie))