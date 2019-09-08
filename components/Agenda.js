import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bigAvatar: {
    margin: 12,
    width: 180,
    height: 180,
  },
  smallAvatar: {
    margin: 5,
    width: 100,
    height: 100,
  },
  icons: {
    fontSize: '20px'
  },
  fct: {
    marginBottom: 0,
  },
});

export default function CardBenevole(props) {
  const classes = useStyles();
  const theme = useTheme();
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  moment.locale('fr')

  function eventColor(type) {
    switch(type) {
      case 'Compétition':
        return "#E91E63";
      case 'Formation':
        return "#00BCD4";
      case 'Stage':
        return "#AA00FF";
      case 'Réunion':
        return "#2962FF";
      case 'Fête':
        return "#FF9800";
      case 'Divers':
        return "#1DE9B6";
      default:
        return "primary.paper";
    }
  }

  return (
    <Grid container spacing={2}>
      {events.map(event => (
        <Grid item xs={12} key={event.id}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} md={2}>
                <Box
                  display="flex" 
                  color="background.paper"
                  bgcolor={eventColor(event.type)}
                  fontFamily="h6.fontFamily"
                  fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
                  p={{ xs: 2, sm: 3, md: 4 }}
                  justifyContent="center"
                  alignItems="center"
                  height={{xs: 100, md: 120}}
                >
                  <Box align="center">{labelProps.size==="large" ? moment(event.datefin).format('DD MMMM') : moment(event.datefin).format('DD MMM')}</Box>
                </Box>
                <Box
                  display="flex" 
                  color={eventColor(event.type)}
                  fontFamily="h6.fontFamily"
                  fontSize={{ xs: 'subtitle1.fontSize', md: 'h6.fontSize' }}
                  justifyContent="center"
                  alignItems="center"
                >
                  {event.type}
                </Box>
              </Grid>
              <Grid item xs container> 
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Box color={eventColor(event.type)}>
                      <Typography variant="h5" component="h2" color="inherit">
                        {event.title}
                      </Typography>
                    </Box>
                    {event.lieu ? <Typography className={classes.pos} variant="body2" color="textSecondary"><FontAwesomeIcon icon={faMapMarkedAlt} className={classes.icons} /> {event.lieu.address}</Typography> : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Grid>
      ))}
    </Grid>
  );
}