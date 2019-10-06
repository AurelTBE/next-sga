import React from 'react'
// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comp
import Layout from '../components/Layout'
import Calendar from '../components/Calendar';

// Redux
import { connect } from 'react-redux';
import { CALENDARCONTENT } from '../redux/actionTypes';

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
    calendar: {
      fontSize: '1em',
      fontWeight: 300,
      lineHeight: 1.5,
    },
  }));

function Calendrier({calcontent}) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Layout>
          <div className="root">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={10} className={classes.calendar}>
                <Calendar calcontent={calcontent} />
              </Grid>
            </Grid>
          </div>
        </Layout>
    )
}

Calendrier.getInitialProps = async function(ctx) {
  const cal = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/calendar`);
  const calevents = await cal.json();

  ctx.store.dispatch({ type: CALENDARCONTENT, payload: calevents });

  return {};
};

const mapStateToProps = state => ({ 
  calcontent: state.calendarevents,
 });

export default connect(
  mapStateToProps,
)(Calendrier);