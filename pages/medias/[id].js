import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Link from 'next/link';

// Layout
import Layout from '../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import { reauthenticate, getCookie } from '../redux/actions/authActions';
import Router from 'next/router'; 

// FCT
import fetch from 'isomorphic-unfetch';

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

function Caroussel(props) { 
// if toggler is updated when lightbox is closed it will open it 
// if toggler is updated when lightbox is opened it will close it 
const [toggler, setToggler] = useState(false);
const photos = [...new Set(props.galerie.photos.map(photo => photo.large))]
  return ( 
    <> 
      <button onClick={ () => setToggler(!toggler) }> 
      Toggle Lightbox 
      </button> 
      <FsLightbox 
      toggler={ toggler } 
      sources={ props.images } 
      type='image'
      />
    </> 
  ); 
}


export default function Galerie(props) {
  const classes = useStyles();
  const theme = useTheme();

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

  switch(props.galerie.visible) {
    case 'Public':
      return (
        <Layout>
          <div className={classes.root}>
            <GridList cellHeight={labelProps.size==="large" ? 350 : 140} cols={labelProps.size==="large" ? 3 : 2} className={classes.gridList} spacing={0}>
              {props.galerie.photos.map(image => (
                  <ButtonBase className={classes.tileBtn} key={image.id}>
                    <GridListTile component="a"  onClick={ () => openLightboxOnSlide(props.galerie.photos.indexOf(image)+1) }>
                      <img src={image.small} alt={image.title} />
                    </GridListTile>
                  </ButtonBase>
              ))}
            </GridList>
            <FsLightbox 
              toggler={ lightboxController.toggler } 
              slide={ lightboxController.slide } 
              sources={ props.images } 
              type='image'
            /> 
          </div>
        </Layout>
      );
    case 'Gym':
      return (
        <Layout>
          <div className={classes.root}>
          <Typography variant="h5" component="h2" color="primary">Seules les gymnastes membres de la SGA Peuvent accèder à cette page. Si vous êtes membre, connectez-vous.</Typography>
          </div>
        </Layout>
      );
    case 'Bénévole':
      return (
        <Layout>
          <div className={classes.root}>
            <Typography variant="h5" component="h2" color="primary">Seules les bénévoles membres de la SGA Peuvent accèder à cette page. Si vous êtes bénévole, connectez-vous.</Typography>
          </div>
        </Layout>
      );
    default:
      return null;
  }
}


Galerie.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/galeries/${id}`);
  const galerie = await res.json();
  const images = [...new Set(galerie.photos.map(photo => photo.large))]

  return {
    galerie: galerie,
    images: images
  };
};