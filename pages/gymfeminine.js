import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

export default function GymFem(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <Layout>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
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
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Entrainements entrainements={props.entrainements} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Benevoles benevoles={props.benevoles} />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

//



GymFem.getInitialProps = async function() {
  const ent = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/entrainements`);
  const entrainements = await ent.json();
  const ben = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/benevoles`);
  const benevoles = await ben.json();

  return {
    entrainements: entrainements,
    benevoles: benevoles,
  };
};