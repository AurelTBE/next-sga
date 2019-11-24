import React from 'react'
import fetch from 'isomorphic-unfetch';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comp
import Layout from '../components/Layout'
import CardCal from '../components/cards/CardCal';
import Calendar from '../utils/Calendar';

// Redux
import { connect } from 'react-redux';
import { CALENDARCONTENT } from '../redux/actionTypes';


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    title: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 28,
      }
    },
    cal: {
      paddingBottom: theme.spacing(2),
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

function Calendrier({calcontent, calfiles}) {
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
              <Grid item xs={12} className={classes.calendar}>
                {/* Composant calendrier */}
                <Box className={classes.cal}>
                  <Calendar calcontent={calcontent}/>
                </Box>
                {/* Calendriers à télécharger */}
                <Box
                  id="livres"
                  display="flex" 
                  color="background.paper"
                  bgcolor={theme.palette.secondary.main}
                  fontFamily="h6.fontFamily"
                  fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
                  p={{ xs: 2, sm: 3, md: 4 }}
                  justifyContent="center"
                  alignItems="center"
                  height={{xs: 60, md: 120}}
                  width={1}
                >
                  <Typography component="h3" variant={isSmallScreen ? "h4" : "h3"} className={classes.title}>
                    {isSmallScreen ? "Calendriers" : "Calendriers à télécharger"}
                  </Typography>
                </Box>
                <Box p={2}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                    
                  >        
                  {calfiles.map(cal => (
                    <Grid item xs={12} lg={4} key={cal.fichier}>
                      <CardCal calendrier={cal} />
                    </Grid>
                  ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Layout>
    )
}

Calendrier.getInitialProps = async function(ctx) {
  const calev = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/calendar`);
  const calevents = await calev.json();
  const calf = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/cal`);
  const calfiles = await calf.json();

  ctx.store.dispatch({ type: CALENDARCONTENT, payload: calevents });

  return {
    calfiles,
  };
};

const mapStateToProps = state => ({ 
  calcontent: state.calendarevents,
 });

export default connect(
  mapStateToProps,
)(Calendrier);