import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Get & use scroll position
import useScrollPosition from "../hooks/useScrollPosition";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faImages } from '@fortawesome/free-regular-svg-icons';

// Components
import Actus from './Actus';
import Agenda from './Agenda';
import Medias from './Medias';
import Resultats from './Resultats';


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

export default function HomeTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  //const isSmallScreen = /xs|sm/.test(width);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };
  const scrollPos = useScrollPosition();

  function handleChange(event, newValue) {
    setValue(newValue);
    scrollPos >= 64 ? window.scrollTo(0, 64) : null;
  }

  function handleChangeIndex(index) {
    setValue(index);
    scrollPos >= 64 ? window.scrollTo(0, 64) : null;
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Page d'accueil de la SGA"
        >
          <Tab label={labelProps.size==="large" ? "Actualités" : <FontAwesomeIcon icon={faDragon} />} {...a11yProps(0)} />
          <Tab label={labelProps.size==="large" ? "Agenda" : <FontAwesomeIcon icon={faCalendarAlt} />} {...a11yProps(1)} />
          <Tab label={labelProps.size==="large" ? "Médiathèque" : <FontAwesomeIcon icon={faImages} />} {...a11yProps(2)} />
          <Tab label={labelProps.size==="large" ? "Résultats" : <FontAwesomeIcon icon={faTrophy} />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Actus listactus={props.actus} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Agenda events={props.events} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Medias mediafolders={props.mediafolders} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Resultats listresults={props.results} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}