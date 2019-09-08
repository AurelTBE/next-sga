import Link from 'next/link';
import React, {useState, useEffect} from 'react';
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

function eventColor(type) {
  switch(type) {
    case 'Compétition':
      return "#E91E63";
    case 'Formation':
      return "#FF9800";
    case 'Stage':
      return "#1DE9B6";
    case 'Réunion':
      return "#005ECB";
    case 'Fête':
      return "#AA00FF";
    case 'Divers':
      return "#00BCD4";
    default:
      return "primary.paper";
  }
}

export default function Agenda(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eve = []
    props.events.map(event => ([
      eve.push({
        id: event.id,
        title: event.title,
        datedebut: moment(event.datedebut.date),
        datefin: moment(event.datefin.date),
        type: event.type,
        groupe: event.groupe,
        lieu: event.lieu,
        infos: event.infos,
      })
    ]))
    setEvents(eve)
  }, [setEvents])

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  moment.locale('fr')

  return (
  <div className={classes.root}>
    {events.map((event) => (
      <ExpansionPanel expanded={expanded === `panel${event.id}`} onChange={handleChange(`panel${event.id}`)} key={event.id} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {console.log(event)}
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs={5} container spacing={2} >
                <Grid item xs={12} container justify="flex-start">
                  <Grid item xs={5}>
                    <Typography variant="h4">
                    {moment(event.datedebut).format('DD MMMM')}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h5">
                      {event.datefin != event.datedebut ? ` - ${moment(event.datefin).format('DD MMMM')}` : null }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs>
                <Typography className={classes.heading}>{event.type}</Typography>
                </Grid>
              </Grid>
              <Typography className={classes.secondaryHeading}>{event.title}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container justify="center" className={classes.root}>
        <Grid item xs={12}>
        <Typography className={classes.pos} variant="body2">
          {event.infos}
        </Typography>
          </Grid>
        </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
  </div>
);
}

