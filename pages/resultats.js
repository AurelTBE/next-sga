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
import ResultJeunesses from '../components/resultats/ResultJeunesses';
import ResultAinees from '../components/resultats/ResultAinees';
import ResultIndivs from '../components/resultats/ResultIndivs';

// Get & use scroll position
import useScrollPosition from "../utils/useScrollPosition";

// Redux
import { connect } from 'react-redux';
import { setactivresultab } from '../redux/actions/navActions';
import { RESULTSBOXCONTENT } from '../redux/actionTypes';

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

function Resultats({ setactivresultab, activeTab, resultsbox, benevoles }) {
  const classes = useStyles();
  const theme = useTheme();
  const scrollPos = useScrollPosition();

  function handleChange(event, newValue) {
    setactivresultab(newValue);
    scrollPos >= 64 ? window.scrollTo(0, 56) : null;
  }

  function handleChangeIndex(index) {
    setactivresultab(index);
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
          <Tab label="Jeunesses" {...a11yProps(0)} />
          <Tab label="Aînées" {...a11yProps(1)} />
          <Tab label="Individuelles" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <ResultJeunesses resultsbox={resultsbox} />
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <ResultAinees resultsbox={resultsbox} />
        </TabPanel>
        <TabPanel value={activeTab} index={2} dir={theme.direction}>
          <ResultIndivs resultsbox={resultsbox} />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

Resultats.getInitialProps = async function(ctx) {
  const res = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/resultsbox`);
  const resultats = await res.json();
  const sais = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/saisons`);
  const saisons = await sais.json();
  const jeun = [...new Set(resultats.map(result => result.groupe == "Jeunesses" && result))]
  const jeunesses = jeun.filter(Boolean)
  const ain = [...new Set(resultats.map(result => result.groupe == "Aînées" && result))]
  const ainees = ain.filter(Boolean)
  const indi = [...new Set(resultats.map(result => result.groupe == "Indiv" && result))]
  const indiv = indi.filter(Boolean)
  const resultsbox = {
    jeunesses,
    ainees,
    indiv,
    saisons: saisons.saisons,
  }
  ctx.store.dispatch({ type: RESULTSBOXCONTENT, payload: resultsbox });

  return {};
};

const mapStateToProps = state => ({ 
  activeTab: state.activresultab,
  resultsbox: state.resultsbox,
 });

export default connect(
  mapStateToProps,
  { setactivresultab }
)(Resultats);