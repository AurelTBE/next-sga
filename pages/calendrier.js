import Layout from '../components/Layout'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Calendar from '../components/Calendar';

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
    }
  }));

export default function Calendrier() {
    const classes = useStyles();
    return (
        <Layout>
          <div className="App">
            <header>
              <div id="logo">
                <span className="icon">date_range</span>
                <span>
                  react<b>calendar</b>
                </span>
              </div>
            </header>
            <main>
              <Calendar />
            </main>
          </div>
        </Layout>
    )
}