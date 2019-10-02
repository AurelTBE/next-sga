import React from 'react';

// Components
import PicPublicGalerie from './photos/PicPublicGalerie'
import PicPrivateGalerie from './photos/PicPrivateGalerie'
import VidPublicGalerie from './videos/VidPublicGalerie'
import VidPrivateGalerie from './videos/VidPrivateGalerie'

// Redux
import { connect } from 'react-redux';
import { reauthenticate } from '../../redux/actions/authActions';
import { GALERIECONTENT } from '../../redux/actionTypes';

// FCT
import fetch from 'isomorphic-unfetch';

function Galerie({galerieContent}) {
  function photoSwitch(type) {
    switch(type) {
      case 'Public':
        return <PicPublicGalerie pics={galerieContent.galerie.photos} />
      case 'Membres':
        return <PicPrivateGalerie pics={galerieContent.galerie.photos} />
      default:
        return null;
    }
  }
  
  function videoSwitch(type) {
    switch(type) {
      case 'Public':
        return <VidPublicGalerie vids={galerieContent.galerie.videos} />
      case 'Membres':
        return <VidPrivateGalerie vids={galerieContent.galerie.videos} />
      default:
        return null;
    }
  }

  if(galerieContent.galerie.photos) {
    return photoSwitch(galerieContent.galerie.visible)
  } else if(galerieContent.galerie.videos) {
    return videoSwitch(galerieContent.galerie.visible)
  }
}

Galerie.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const gal = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/galeries/${id}`);
  const galerie = await gal.json();
  const galeriecont = {
    galerie: galerie,
  }

  ctx.store.dispatch({ type: GALERIECONTENT, payload: galeriecont });

  return {}
};

const mapStateToProps = state => ({ 
  galerieContent: state.galeriecontent,
 });

export default connect(
  mapStateToProps,
  { reauthenticate }
)(Galerie);