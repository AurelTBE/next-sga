import Link from 'next/link';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as moment from 'moment';
import he from 'he';

// MUI
import Grid from '@material-ui/core/Grid';

import Events from './Events';
import PastEvents from './PastEvents'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  media: {
    maxWidth: "100%",
  },
  competitions: {
    backgroundColor: "red",
  },
  divers: {
    backgroundColor: "blue",
  },
  formations: {
    backgroundColor: "green",
  },
  reunions: {
    backgroundColor: "yellow",
  },
  stages: {
    backgroundColor: "pink",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function displayMonth(numonth) {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
  return months[numonth-1]
}

export default function Agenda(props) {
  const classes = useStyles();
  const [isPrev, setIsPrev] = useState(false);

  function togglePrev() {
    isPrev ? setIsPrev(false) : setIsPrev(true);
  }

  const currentDate = moment().format("DD");
  const currentMonth = moment().format("MM");

  return (
    <div className={classes.root}>
      <Button onClick={togglePrev} variant="contained" color="primary" className={classes.button}>{isPrev ? "Prochains événements" : "Événements passés"}</Button>
      {isPrev ? <PastEvents allevents={props.allevents} /> : <Events allevents={props.allevents} /> }
    </div>
  );
}

