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
import JugesDocs from '../components/juges/JugesDocs';
import JugesVids from '../components/juges/JugesVids';

// Get & use scroll position
import useScrollPosition from "../utils/useScrollPosition";

// Redux
import { connect } from 'react-redux';
import { setactivjugestab } from '../redux/actions/navActions';
import { JUGESCONTENT } from '../redux/actionTypes';
import withAuth from '../utils/withAuth'

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
      <Box>{children}</Box>
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

function Juges({ setactivjugestab, activeTab, jugesContent }) {
  const classes = useStyles();
  const theme = useTheme();
  const scrollPos = useScrollPosition();

  function handleChange(event, newValue) {
    setactivjugestab(newValue);
    scrollPos >= 64 ? window.scrollTo(0, 56) : null;
  }

  function handleChangeIndex(index) {
    setactivjugestab(index);
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
          <Tab label="Documents" {...a11yProps(0)} />
          <Tab label="Vidéos" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <Box p={1}>
            <JugesDocs docs={jugesContent.docs}  />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <Box p={1}>
            <JugesVids agres={jugesContent.vidagres} vids={jugesContent.videos} />
          </Box>
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

Juges.getInitialProps = async function(ctx) {
  const jug = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/juges`);
  const juges = await jug.json();
  const vidagres = [...new Set(juges.juges.videos.map(vid => vid.agres))];
  const jugescont = {
    docs: juges.juges.docs,
    videos: juges.juges.videos,
    vidagres: vidagres,
  }

  ctx.store.dispatch({ type: JUGESCONTENT, payload: jugescont });

  return {};
};

const mapStateToProps = state => ({ 
  activeTab: state.activjugestab,
  jugesContent: state.jugescontent,
 });

export default withAuth(["administrator", "cadre"])(connect(
  mapStateToProps,
  { setactivjugestab }
)(Juges));