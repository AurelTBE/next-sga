import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

import Link from 'next/link';

// Layout
import Layout from '../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// FCT
import fetch from 'isomorphic-unfetch';


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
}));


export default function Resultat(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  switch(props.galerie.visible) {
    case 'Public':
      return (
        <Layout>
          <div className={classes.root}>
            <GridList cellHeight={labelProps.size==="large" ? 350 : 250} cols={labelProps.size==="large" ? 3 : 1} className={classes.gridList} spacing={0}>
              {props.galerie.photos.map(image => (
                  <GridListTile button component="a" key={image.id}>
                    <img src={image.small} alt={image.title} />
                  </GridListTile>
              ))}
            </GridList>
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


Resultat.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/galeries/${id}`);
  const galerie = await res.json();

  return {
    galerie: galerie
  };
};