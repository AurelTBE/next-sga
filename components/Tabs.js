import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs(props) {
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
        >
          <Tab {...labelProps} label={labelProps.size==="large" ? "Actualités" : <FontAwesomeIcon icon={faDragon} />} />
            <Tab {...labelProps} label={labelProps.size==="large" ? "Agenda" : <FontAwesomeIcon icon={faCalendarAlt} />} />
            <Tab {...labelProps} label={labelProps.size==="large" ? "Médiathèque" : <FontAwesomeIcon icon={faImages} />} />
            <Tab {...labelProps} label={labelProps.size==="large" ? "Résultats" : <FontAwesomeIcon icon={faTrophy} />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
          <TabContainer dir={theme.direction}>
            <Actus listactus={props.actus} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Agenda events={props.events} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Medias mediafolders={props.mediafolders} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Resultats listresults={props.results} />
          </TabContainer>
      </SwipeableViews>
    </div>
  );
}