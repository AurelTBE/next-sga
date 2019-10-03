import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Layout
import Layout from '../../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import withAuth from '../../../utils/withAuth'

import AudioPlayer from '../../../utils/AudioPlayer.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));  
  
function MusPrivateGalerie({galerieContent, musics}) {
    const classes = useStyles();
    const theme = useTheme();
    const { galerie } = galerieContent;  
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

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
          {musics.map(music => <AudioPlayer music={music} />)}
        </div>
      </Layout>
    )
}

const mapStateToProps = state => ({ 
  galerieContent: state.galeriecontent,
 });

 export default withAuth(["administrator", "cadre", "famille", "licencie"])(connect(
  mapStateToProps
)(MusPrivateGalerie));