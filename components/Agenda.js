import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'

// Addtocal message
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { faGoogle, faYahoo, faApple } from '@fortawesome/free-brands-svg-icons'
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { Outlook } from 'mdi-material-ui'
import dynamic from 'next/dynamic'
const ICalendarLink  = dynamic(() => import('react-icalendar-link'), {
  ssr: false
});
import { NoSsr } from '@material-ui/core';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  link: {
    textDecoration: 'none',
  },
  ico: {
    margin: theme.spacing(1),
  },
  city: {
    textTransform: 'uppercase',
  },
  linebreak: {
    display: 'inline-block',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  fct: {
    marginBottom: 0,
  },
  list: {
    padding: 0,
  },
  calicons: {
    margin: theme.spacing(1),
  },
  outlookcalicon: {
    fontSize: 17,
    margin: theme.spacing(1),
  },
  icsdl: {
    display: "inline-block",
    textDecoration: "none",
    color: theme.palette.text.secondary
  }
}));

export default function CardBenevole(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [open, setOpen] = useState(false);
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('https://sga-gymfeminine.fr/bo/wp-json/sga/v1/evenements', fetcher, { onSuccess: data => {
    const eve = []
    data.map(event => ([
      eve.push({
        id: event.id,
        title: event.title,
        datedebut: new Date(event.datedebut.date),
        datefin: new Date(event.datefin.date),
        googdebut: format(new Date(event.datedebut.date), "yyyyMMdd")+'T'+format(new Date(event.datedebut.date), "HHmmss"),
        googfin: format(new Date(event.datefin.date), "yyyyMMdd")+'T'+format(new Date(event.datefin.date), "HHmmss"),
        type: event.type,
        groupe: event.groupe,
        ville: event.localisation.ville,
        lieu: event.localisation.lieu,
        adresse: event.localisation.adresse,
        participants: event.participants,
        article: event.article,
        infos: (event.infos && `${event.infos}\n`)+(event.participants && (!!event.participants[0].nom_equipe ? `Participants :${event.participants.map(part => (
          ' '+part.nom_equipe+` ${part.heure_rdv && `(RDV à ${part.heure_rdv})`}`
          ))}` : "")),
      })
    ]))
    setEvents(eve)
  }}
  )

  function handleClickOpen(event) {
    setSelectedEvent(event)
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

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

  if (error) return <div>Impossible de charger les événements...</div>
  if (!data) return <div>Chargement des événements...</div>
  return (
    <Grid container spacing={2}>
      {events.map(event => (
        <Grid item xs={12} key={event.id}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4} md={2}>
                  <ButtonBase onClick={() => handleClickOpen(event)} style={{width: "100%"}}>
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
                      width={1}
                    >
                      <Box align="center">{labelProps.size==="large" ? format(event.datedebut, 'dd MMMM', {locale: fr}) : format(event.datedebut, 'dd MMM', {locale: fr})}</Box>
                    </Box>
                  </ButtonBase>
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
                      <Box 
                        color={eventColor(event.type)}
                      >
                        <Typography variant={labelProps.size==="large" ? 'h4' : 'h5'} component="h2" color="inherit">
                          {event.title}
                        </Typography>
                      </Box>
                      {event.ville &&
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${event.adresse.lat},${event.adresse.lng}`} target="_blank" rel="noopener" className={classes.link}>
                          <Typography variant={labelProps.size==="large" ? 'h6' : 'body2'} color="textSecondary" className={classes.ico}>
                            <FontAwesomeIcon icon={faMapMarkedAlt} className={clsx(classes.leftIcon, classes.iconSmall)} color={eventColor(event.type)} />
                            <span className={classes.city}>{event.ville}{event.lieu && ", "}</span><span className={classes.linebreak}>{event.lieu}</span>
                          </Typography>
                        </a>}
                      {event.groupe && 
                        <Typography component="div" variant={labelProps.size==="large" ? 'h6' : 'body2'} color="textSecondary" className={classes.ico}>
                          <FontAwesomeIcon icon={faUsers} className={clsx(classes.leftIcon, classes.iconSmall)} />
                          {event.groupe.map((grp, index) => {
                            return <span className={classes.linebreak} key={event.id+grp}>{grp}{index < event.groupe.length - 1 && ',\u00A0'}</span>
                          })}
                        </Typography>}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <NoSsr>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Ajouter à mon agenda</DialogTitle>
          <DialogContent className={classes.list}>
            <DialogContentText component="div">
              {selectedEvent &&
                <List>
                  <ListItem button component="a" aria-label="Google-Calendar" target="_blank" rel="noopener" href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${selectedEvent.title}${selectedEvent.infos && `&details=${selectedEvent.infos}`}&location=${selectedEvent.adresse ? selectedEvent.adresse.address : selectedEvent.ville}&dates=${selectedEvent.googdebut}%2F${selectedEvent.googfin}&ctz=Europe/Paris`} onClick={handleClose}>
                    <ListItemIcon><FontAwesomeIcon icon={faGoogle} className={classes.calicons} /></ListItemIcon>
                    <ListItemText primary="Google" />
                  </ListItem>
                  <ListItem button>
                    <ICalendarLink 
                      event={{
                        title: selectedEvent.title,
                        description: selectedEvent.infos && selectedEvent.infos,
                        startTime: selectedEvent.datedebut,
                        endTime: selectedEvent.datefin,
                        location: selectedEvent.adresse ? selectedEvent.adresse.address : selectedEvent.ville,
                      }}
                    >
                      <ListItemIcon onClick={() => handleClose()}><FontAwesomeIcon icon={faApple} className={classes.calicons} /></ListItemIcon>
                      <ListItemText primary="Apple Calendar" className={classes.icsdl} onClick={() => handleClose()}/>
                    </ICalendarLink>
                  </ListItem>
                  <ListItem button>
                    <ICalendarLink 
                      event={{
                        title: selectedEvent.title,
                        description: selectedEvent.infos && selectedEvent.infos,
                        startTime: selectedEvent.datedebut,
                        endTime: selectedEvent.datefin,
                        location: selectedEvent.adresse ? selectedEvent.adresse.address : selectedEvent.ville,
                      }}
                    >
                      <ListItemIcon onClick={() => handleClose()}><Outlook className={classes.outlookcalicon} /></ListItemIcon>
                      <ListItemText primary="Outlook" className={classes.icsdl} onClick={() => handleClose()}/>
                    </ICalendarLink>
                  </ListItem>
                  <ListItem button component="a" aria-label="Yahoo-Calendar" target="_blank" rel="noopener" href={`http://calendar.yahoo.com/?v=60&TITLE=${selectedEvent.title}&ST=${selectedEvent.datedebut}&ET=${selectedEvent.datefin}&in_loc=${selectedEvent.adresse ? selectedEvent.adresse.address : selectedEvent.ville}&DESC=${selectedEvent.infos ? selectedEvent.infos : "Aucune description"}&URL=${'https://sgagymfem.com/'}`} onClick={handleClose}>
                    <ListItemIcon><FontAwesomeIcon icon={faYahoo} className={classes.calicons} /></ListItemIcon>
                    <ListItemText primary="Yahoo" />
                  </ListItem>
                  <ListItem button>
                    <ICalendarLink 
                      event={{
                        title: selectedEvent.title,
                        description: selectedEvent.infos && selectedEvent.infos,
                        startTime: selectedEvent.datedebut,
                        endTime: selectedEvent.datefin,
                        location: selectedEvent.adresse ? selectedEvent.adresse.address : selectedEvent.ville,
                      }}
                    >
                      <ListItemIcon onClick={() => handleClose()}><FontAwesomeIcon icon={faCalendarPlus} className={classes.calicons} /></ListItemIcon>
                      <ListItemText primary="Autres calendriers" className={classes.icsdl} onClick={() => handleClose()}/>
                    </ICalendarLink>
                  </ListItem>
                </List>
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </NoSsr>
    </Grid>
  );
}