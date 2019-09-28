import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// Layout
import Layout from '../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';

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
    gridList: {
      width: "100%",
      height: "auto",
    },
    tileBtn: {
      display: 'block',
      textAlign: 'initial'
    }
  }));  
  
function PublicGalerie(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { galerieContent } = props;
    const { galerie, images } = galerieContent;
  
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const labelProps = {
      size: isSmallScreen ? "small" : "large"
    };
  
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
            <GridList cellHeight={labelProps.size==="large" ? 350 : 140} cols={labelProps.size==="large" ? 3 : 2} className={classes.gridList} spacing={0}>
            {galerie.photos.map(image => (
                <ButtonBase className={classes.tileBtn} key={image.id}>
                    <GridListTile component="a"  onClick={ () => openLightboxOnSlide(galerie.photos.indexOf(image)+1) }>
                    <img src={image.small} alt={image.title} />
                    </GridListTile>
                </ButtonBase>
            ))}
            </GridList>
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

 export default connect(
  mapStateToProps
)(PublicGalerie);