import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Layout
import Layout from '../../../components/Layout.js';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import withAuth from '../../../utils/withAuth'

// Player Component
import PlayerAudio from '../../../utils/PlayerAudio.js';


const useStyles = makeStyles(theme => ({

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
        <Box p={2}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
            {musics.map(music => (
              <Grid item xs={12} lg={4} key={music.musique}>
                <PlayerAudio music={music} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    )
}

const mapStateToProps = state => ({ 
  galerieContent: state.galeriecontent,
 });

 export default withAuth(["administrator", "cadre", "famille", "licencie"])(connect(
  mapStateToProps
)(MusPrivateGalerie));