import React from 'react'
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

// Redux
import { connect } from 'react-redux';
import { setactivmediatab } from '../redux/actions/navActions';

// Requetes
import fetch from 'isomorphic-unfetch';


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

function Medias({ setactivmediatab, activeTab, entrainements, benevoles }) {
  const classes = useStyles();
  const theme = useTheme();

  function handleChange(event, newValue) {
    setactivmediatab(newValue);
  }

  function handleChangeIndex(index) {
    setactivmediatab(index);
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
          <Entrainements entrainements={entrainements} />
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <Benevoles benevoles={benevoles} />
        </TabPanel>
        <TabPanel value={activeTab} index={2} dir={theme.direction}>
          <div>Musiques</div>
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

//



Medias.getInitialProps = async function() {
  const ent = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/entrainements`);
  const entrainements = await ent.json();
  const ben = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/benevoles`);
  const benevoles = await ben.json();

  return {
    entrainements: entrainements,
    benevoles: benevoles,
  };
};

const mapStateToProps = state => ({ activeTab: state.activmediatab });

export default connect(
  mapStateToProps,
  { setactivmediatab }
)(Medias);