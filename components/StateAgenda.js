import React, { Component } from 'react'
import Link from 'next/link';
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

import Events from './Events';


function displayMonth(numonth) {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
  return months[numonth-1]
}

export default class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      prevEvents: [],
      upcomingEvents: [],
    };
  }

  render() {
    
    const currentDate = moment().format("DD");
    const currentMonth = moment().format("MM");

     function addPreviousEvent(event) {
      this.setState(state => {
        const prevEvents = [...state.prevEvents, event];
  
        return {
          prevEvents
        };
      });
    };

    return (
    <>
      {this.props.allevents.map((event) => (
      moment(event.end_date).isBefore(moment(), 'day') ? addPreviousEvent(event) : console.log("Après aujourd'hui")))}
      <Events allevents={this.props.allevents} />
    </>
    )
  }
}