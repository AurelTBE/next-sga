import Link from 'next/link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
}));

export default function Agenda(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        {props.listevents.map((event) => (
          <ExpansionPanel expanded={expanded === `panel${event.id}`} onChange={handleChange(`panel${event.id}`)} key={event.id} >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{event.categories[0].name}</Typography>
              <Typography className={classes.secondaryHeading}>{event.title}</Typography>
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
        {console.log(props.listevents)}
    </div>
  );
}