import React from 'react';
import fetch from 'isomorphic-unfetch';

// Components
import PicPublicGalerie from './photos/PicPublicGalerie'
import PicPrivateGalerie from './photos/PicPrivateGalerie'
import VidPublicGalerie from './videos/VidPublicGalerie'
import VidPrivateGalerie from './videos/VidPrivateGalerie'
import MusPublicGalerie from './musics/MusPublicGalerie'
import MusPrivateGalerie from './musics/MusPrivateGalerie'

// Redux
import { connect } from 'react-redux';
import { reauthenticate } from '../../redux/actions/authActions';
import { GALERIECONTENT } from '../../redux/actionTypes';

function Galerie({galerieContent}) {
  function photoSwitch(visible) {
    switch(visible) {
      case 'Public':
        return <PicPublicGalerie pics={galerieContent.galerie.photos} />
      case 'Membres':
        return <PicPrivateGalerie pics={galerieContent.galerie.photos} />
      default:
        return null;
    }
  }
  
  function videoSwitch(visible) {
    switch(visible) {
      case 'Public':
        return <VidPublicGalerie vids={galerieContent.galerie.videos} />
      case 'Membres':
        return <VidPrivateGalerie vids={galerieContent.galerie.videos} />
      default:
        return null;
    }
  }

  function musicSwitch(visible) {
    switch(visible) {
      case 'Public':
        return <MusPublicGalerie musics={galerieContent.galerie.musiques} />
      case 'Membres':
        return <MusPrivateGalerie musics={galerieContent.galerie.musiques} />
      default:
        return null;
    }
  }

  if(galerieContent.galerie.photos) {
    return photoSwitch(galerieContent.galerie.visible)
  } else if(galerieContent.galerie.videos) {
    return videoSwitch(galerieContent.galerie.visible)
  } else if(galerieContent.galerie.musiques) {
    return musicSwitch(galerieContent.galerie.visible)
  }
}

Galerie.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const gal = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/galeries/${id}`);
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