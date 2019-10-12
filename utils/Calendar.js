import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { format, addMonths, subMonths, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import isWithinInterval from 'date-fns/isWithinInterval'
// UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
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
}));

function Calendar({calcontent}) {
  const classes = useStyles();
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
            {format(currentMonth, dateFormat, {locale: fr})}            
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

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat, {locale: fr});
        const cloneDay = day;
        var interv = isWithinInterval(cloneDay, {
          start: new Date(calcontent[7].datedebut.date),
          end: new Date(calcontent[7].datefin.date)
        })
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
          >
            <Box display="flex" justifyContent="flex-end">{formattedDate}</Box>
            {console.log(new Date(calcontent[7].datefin.date))}
            {
              calcontent.map(event => 
                ((isSameDay(day, new Date(event.datedebut.date)) || isSameDay(day, new Date(event.datefin.date))) &&
                  <Box color="background.paper" bgcolor={eventColor(event.type)} key={event.title + event.datedebut.date} onClick={() => onDateClick(cloneDay)}>{event.title}{console.log(new Date(event.datefin.date))}</Box>
                )
              )
            }
            <span className="bg">{formattedDate}</span>
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

  const onDateClick = day => {
    alert(day)
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  };

  var result = eachDayOfInterval({
    start: new Date(calcontent[7].datedebut.date),
    end: new Date(calcontent[7].datefin.date)
  })
    
  return (
    <>
      {renderHeader()}    
      <div className="calendar">
        {console.log(calcontent)}
        {console.log(result)}
        {renderDays()}
        {renderCells()}
      </div>
    </>

  );
}

export default Calendar;