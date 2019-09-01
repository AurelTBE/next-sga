import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  }
}));

function displayMonth(numonth) {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    return months[numonth-1]
}

export default function PastEvents(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const currentDate = moment().format("DD");
  const currentMonth = moment().format("MM");

  return (
    <div className={classes.root}>
      {props.allevents.map((event) => (
        <ExpansionPanel expanded={expanded === `panel${event.id}`} onChange={handleChange(`panel${event.id}`)} key={event.id} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs={1} container spacing={2} >
                  <Grid item xs={12} container justify="flex-start">
                    <Grid item xs={5}>
                      <Typography variant="h2">
                        {event.start_date_details.day}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography gutterBottom variant="h5">
                        {event.end_date_details.day != event.start_date_details.day ? ` - ${event.end_date_details.day}` : null }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography className={classes.heading}>{displayMonth(event.start_date_details.month)}</Typography>
                  </Grid>
                  <Grid item xs>
                  <Typography className={classes.heading}>{event.categories[0].name}</Typography>
                  </Grid>
                </Grid>
                <Typography className={classes.secondaryHeading}>{event.title}{console.log(`${currentDate}/${currentMonth}`)}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container justify="center" className={classes.root}>
          <Grid item xs={12}>
            <Typography 
              component="div" 
              dangerouslySetInnerHTML={ {
                __html: event.description
                } } />
            </Grid>
          </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}