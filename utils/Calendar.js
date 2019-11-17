import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { format, addMonths, subMonths, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay, isAfter, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale'

// UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faUsers, faDragon } from '@fortawesome/free-solid-svg-icons';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Modal
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Add To Cal
import AddToCal from '../utils/AddToCal'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  monthtitle: {
    textTransform: "capitalize",
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
    }
  },
  media: {
    maxWidth: "100%",
  },
  content: {
    textAlign: 'left',
    '& figure': {
      textAlign: 'center',
    },
  },
  bgdate: {
      position: "absolute",
      zIndex: 1,
      right: 0,
      top: -30,
      color: theme.palette.primary.main,
      opacity: 0.3,
      fontSize: 130,
      fontWeight: 400,
      [theme.breakpoints.down('sm')]: {
        top: 20,
        fontSize: 38,
        fontWeight: 300,
      },
  },
  daycontent: {
    position: "relative",
    zIndex: 100,
  },
  link: {
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.background.paper,
  },
  dialoguetitle: {
    color: theme.palette.background.paper,
  },
  cellheight: {
    height: "8em",
    [theme.breakpoints.down('sm')]: {
      height: "5em",
    },
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  linebreak: {
    display: "inline-block",
  }
}));

function Calendar({calcontent}) {
  const classes = useStyles();
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState('');

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  function handleClickOpen(event) {
    setSelectedEvent(event)
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

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
  
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <Box
        display="flex" 
        color="background.paper"
        bgcolor={theme.palette.secondary.main}
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        height={{xs: 70, md: 90}}
        width={1}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Box justifyContent="flex-start">
            <ButtonBase onClick={prevMonth}>
              <ChevronLeftIcon fontSize="large" />
            </ButtonBase>
          </Box>
          <Box justifyContent="center">
            <Typography component="h3" variant={isSmallScreen ? "h4" : "h3"} className={classes.monthtitle}>
              {format(currentMonth, dateFormat, {locale: fr})}            
            </Typography>
          </Box>
          <Box justifyContent="flex-end">
            <ButtonBase onClick={nextMonth}>
              <ChevronRightIcon fontSize="large" />
            </ButtonBase>
          </Box>
        </Grid>
      </Box>
    );
  }

  const renderDays = () => {
    const dateFormat = "eeee";
    const days = [];
    let startDate = startOfWeek(currentMonth, {weekStartsOn: 1});
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat, {locale: fr})}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat, {locale: fr});
        const cloneDay = day;
        days.push(
          <div
            className={clsx(classes.cellheight, `col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`)}
            key={day}
          >
            <Box display="flex" justifyContent="flex-end" mr={0.5}>{formattedDate}</Box>
            {isSameDay(day, selectedDate) && <Box component="span" className={classes.bgdate}>{formattedDate}</Box>}
            {
              calcontent.map(event => 
                ((isSameDay(day, new Date(event.datedebut.date)) || isSameDay(day, new Date(event.datefin.date)) || (isBefore(day, new Date(event.datefin.date)) && isAfter(day, new Date(event.datedebut.date)))) &&
                  (isSmallScreen ? 
                    <Box pl={1} className={classes.daycontent} key={event.title + event.datedebut.date}><FontAwesomeIcon icon={faDragon} color={eventColor(event.type)} key={event.title + event.datedebut.date} onClick={() => handleClickOpen(event)}/></Box>
                  : 
                    <Box p={1} color="background.paper" bgcolor={eventColor(event.type)} key={event.title + event.datedebut.date} onClick={() => handleClickOpen(event)} className={classes.daycontent}>{event.title}</Box>
                ))
              )
            }
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  };
    
  return (
    <>
      {renderHeader()}    
      <div className="calendar">
        {renderDays()}
        {renderCells()}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth={false}
      >
        <Box bgcolor={eventColor(selectedEvent.type)}>
          <DialogTitle id="responsive-dialog-title" className={classes.dialoguetitle}>  
            <Typography>{selectedEvent.title}</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </Box>
        <DialogContent>
          {selectedEvent && 
            <Box>
              <Typography component="div" variant={isSmallScreen ? 'body2' : 'h6'} style={{color: eventColor(selectedEvent.type)}}>{selectedEvent.type}</Typography> 
              {isSameDay(new Date(selectedEvent.datedebut.date), new Date(selectedEvent.datefin.date)) ? 
                <Typography component="div" variant={isSmallScreen ? 'body2' : 'h6'} color="textSecondary">Date : {format(new Date(selectedEvent.datedebut.date), "dd/MM/yy")}</Typography>
              :
                <>
                  <Typography component="div" variant={isSmallScreen ? 'body2' : 'h6'} color="textSecondary">Début : {format(new Date(selectedEvent.datedebut.date), "dd/MM/yy")}</Typography>
                  <Typography component="div" variant={isSmallScreen ? 'body2' : 'h6'} color="textSecondary">Fin : {format(new Date(selectedEvent.datefin.date), "dd/MM/yy")}</Typography> 
                </>
              }
              {selectedEvent.localisation.ville ? 
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedEvent.localisation.adresse.lat},${selectedEvent.localisation.adresse.lng}`} target="_blank" rel="noopener" className={classes.link}>
                  <Typography variant={isSmallScreen ? 'body2' : 'h6'} color="textSecondary" className={classes.ico}>
                    <FontAwesomeIcon icon={faMapMarkedAlt} className={clsx(classes.leftIcon, classes.iconSmall)} color={eventColor(selectedEvent.type)} />
                    <span className={classes.city}>{selectedEvent.localisation.ville},</span> <span className={classes.linebreak}>{selectedEvent.localisation.lieu}</span>
                  </Typography>
                </a>
              : null}
              {selectedEvent.groupe ? 
                <Typography component="div" variant={isSmallScreen ? 'body2' : 'h6'} color="textSecondary" className={classes.ico}>
                  <FontAwesomeIcon icon={faUsers} className={clsx(classes.leftIcon, classes.iconSmall)} />
                  {selectedEvent.groupe.map((grp, index) => {
                    return <span className={classes.linebreak} key={selectedEvent.id+grp}>{grp}{index < selectedEvent.groupe.length - 1 ? ',\u00A0' : ''}</span>
                  })}
                </Typography> 
              : null}
              <AddToCal event={selectedEvent}/>
            </Box>
          }
        </DialogContent>
      </Dialog>
    </>

  );
}

export default Calendar;