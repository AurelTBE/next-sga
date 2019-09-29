import React from 'react';

// Components
import PublicGalerie from './PublicGalerie'
import PrivateGalerie from './PrivateGalerie'

// Redux
import { connect } from 'react-redux';
import { reauthenticate } from '../../redux/actions/authActions';
import { GALERIECONTENT } from '../../redux/actionTypes';

// FCT
import fetch from 'isomorphic-unfetch';

function Galerie({galerieContent}) {
  switch(galerieContent.galerie.visible) {
    case 'Public':
      return <PublicGalerie />
    case 'Membres':
      return <PrivateGalerie />
    default:
      return null;
  }
}

Galerie.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const gal = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/galeries/${id}`);
  const galerie = await gal.json();
  const images = [...new Set(galerie.photos.map(photo => photo.large))]
  const galeriecont = {
    galerie: galerie,
    images: images,
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