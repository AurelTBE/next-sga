import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Link from 'next/link';

// Layout
import Layout from '../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import { reauthenticate } from '../../redux/actions/authActions';
import { useRouter } from 'next/router'

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


function Galerie({galerie, images, user, role}) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter()

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

  switch(galerie.visible) {
    case 'Public':
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
      );
    case 'Membres':
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
            {user ? 
              (!role.includes("subscriber") ?
              <>
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
              </>
              : 
            <Typography variant="h5" component="h2" color="primary">Seules les adhérents de la SGA ou leurs parents peuvent accèder à cette page. Ton compte n'a pas encore été validé. Prend contact avec un bénévole pour demander qu'on valide ton compte</Typography>
            ) 
              :
            router.push('/connexion')
            }
          </div>
        </Layout>
      );
    default:
      return null;
  }
}

Galerie.getInitialProps = async ctx => {
  const token = ctx.store.getState().authentication.token;
  const { id } = ctx.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/galeries/${id}`);
  const galerie = await res.json();
  const images = [...new Set(galerie.photos.map(photo => photo.large))]
  if (token) {
    return {
      user: ctx.store.getState().authentication.token.user_display_name,
      role: ctx.store.getState().authentication.token.user_role,
      galerie: galerie,
      images: images,
    };
  } else {
      return {
    galerie: galerie,
    images: images,
  }
  }

};

export default connect(
  state => state,
  { reauthenticate }
)(Galerie);