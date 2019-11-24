import React from 'react'
import fetch from 'isomorphic-unfetch';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

// Components
import Layout from '../components/Layout'
import MediaPhotos from '../components/mediatheque/MediaPhotos';
import MediaVideos from '../components/mediatheque/MediaVideos';
import MediaMusic from '../components/mediatheque/MediaMusic';

// Get & use scroll position
import useScrollPosition from "../utils/useScrollPosition";

// Redux
import { connect } from 'react-redux';
import { setactivmediatab } from '../redux/actions/navActions';
import { MEDIATHEQUECONTENT } from '../redux/actionTypes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Medias({ setactivmediatab, activeTab, mediatheque }) {
  const classes = useStyles();
  const theme = useTheme();
  const scrollPos = useScrollPosition();

  function handleChange(event, newValue) {
    setactivmediatab(newValue);
    scrollPos >= 64 ? window.scrollTo(0, 56) : null;
  }

  function handleChangeIndex(index) {
    setactivmediatab(index);
    scrollPos >= 64 ? window.scrollTo(0, 56) : null;
  }

  return (
    <Layout>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Présentation de la section féminine de gym de la SGA"
        >
          <Tab label="Photos" {...a11yProps(0)} />
          <Tab label="Vidéos" {...a11yProps(1)} />
          <Tab label="Musiques" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <MediaPhotos />
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <MediaVideos />
        </TabPanel>
        <TabPanel value={activeTab} index={2} dir={theme.direction}>
          <MediaMusic />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

Medias.getInitialProps = async function(ctx) {
  const media = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/mediatheque`);
  const mediafolders = await media.json();
  const phot = [...new Set(mediafolders.map(media => media.media == "Photos" && media))]
  const photos = phot.filter(Boolean)
  const images = [...new Set(photos.map(photo => photo.couverture))]
  const vid = [...new Set(mediafolders.map(media => media.media == "Vidéos" && media))]
  const videos = vid.filter(Boolean)
  const mus = [...new Set(mediafolders.map(media => media.media == "Musiques" && media))]
  const music = mus.filter(Boolean)
  const mediatheque = {
    photos,
    images,
    videos,
    music
  }
  ctx.store.dispatch({ type: MEDIATHEQUECONTENT, payload: mediatheque });

  return {};
};

const mapStateToProps = state => ({ 
  activeTab: state.activmediatab,
  mediatheque: state.mediatheque
 });

export default connect(
  mapStateToProps,
  { setactivmediatab }
)(Medias);