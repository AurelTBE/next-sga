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
import Benevoles from '../components/Benevoles';
import Entrainements from '../components/Entrainements';

// Get & use scroll position
import useScrollPosition from "../utils/useScrollPosition";

// Redux
import { connect } from 'react-redux';
import { setactivgftab } from '../redux/actions/navActions';
import { GFCONTENT } from '../redux/actionTypes'

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

function GymFem({ setactivgftab, activeTab, gfContent }) {
  const classes = useStyles();
  const theme = useTheme();
  const scrollPos = useScrollPosition();

  function handleChange(event, newValue) {
    setactivgftab(newValue);
    scrollPos >= 64 ? window.scrollTo(0, 56) : null;
  }

  function handleChangeIndex(index) {
    setactivgftab(index);
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
          <Tab label="Entrainements" {...a11yProps(0)} />
          <Tab label="Bénévoles" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <Box p={3}>
            <Entrainements entrainements={gfContent.entrainements} />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <Box p={1}>
            <Benevoles benevoles={gfContent.benevoles} />
          </Box>
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

GymFem.getInitialProps = async function(ctx) {
  const ent = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/entrainements`);
  const entrainements = await ent.json();
  const ben = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/benevoles`);
  const benevoles = await ben.json();
  const gymfem = {
    entrainements,
    benevoles,
  }

  ctx.store.dispatch({ type: GFCONTENT, payload: gymfem });

  return {
    entrainements: entrainements,
    benevoles: benevoles,
  };
};

const mapStateToProps = state => ({ 
  activeTab: state.activgftab,
  gfContent: state.gfcontent
 });

export default connect(
  mapStateToProps,
  { setactivgftab }
)(GymFem);