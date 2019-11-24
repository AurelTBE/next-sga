import React from 'react';
import dynamic from 'next/dynamic'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

// Redux
import { connect } from 'react-redux';
import { setactivhometab } from '../redux/actions/navActions';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Get & use scroll position
import useScrollPosition from "../utils/useScrollPosition";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faImages } from '@fortawesome/free-regular-svg-icons';

// Components
const Actus = dynamic(
  () => import('./Actus'),
  { loading: () => <p>Chargement des actualités...</p> }
)
const Agenda = dynamic(
  () => import('./Agenda'),
  { loading: () => <p>Chargement des événements...</p> }
)
const Medias = dynamic(
  () => import('./Medias'),
  { loading: () => <p>Chargement des galeries...</p> }
)
const Resultats = dynamic(
  () => import('./Resultats'),
  { loading: () => <p>Chargement des résultats...</p> }
)

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

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
      {children}
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

function HomeTabs(props) {
  const { setactivhometab, activeTab } = props;
  const classes = useStyles();
  const theme = useTheme();
  //const isSmallScreen = /xs|sm/.test(width);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };
  const scrollPos = useScrollPosition();

  function handleChange(event, newValue) {
    setactivhometab(newValue);
    scrollPos >= 64 ? window.scrollTo(0, 64) : null;
  }

  function handleChangeIndex(index) {
    setactivhometab(index);
    scrollPos >= 64 ? window.scrollTo(0, 64) : null;
  }

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={activeTab}
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
      </HideOnScroll>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <Box p={3}>
            <Actus />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <Box p={3}>
            <Agenda />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={2} dir={theme.direction}>
          <Medias />
        </TabPanel>
        <TabPanel value={activeTab} index={3} dir={theme.direction}>
          <Box p={3}>
            <Resultats />
          </Box>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = state => ({ activeTab: state.activhometab });

export default connect(
  mapStateToProps,
  { setactivhometab }
)(HomeTabs);