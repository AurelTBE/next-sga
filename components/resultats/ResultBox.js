import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { connect } from 'react-redux';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  card: {
    padding: 0,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: 14,
  },
  indent: {
    paddingLeft: 20,
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    padding: 0,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    padding: 0,
  },
}));

function ResultBox({results}) {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };



  return (
    <>
      { Object.keys(results.saisons.Jeunesses).map(saison => (
        <Card className={labelProps.size==="large" ? null : classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6} container direction="column">
              <CardContent>
                {results.saisons.Jeunesses[saison].saison}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
      
    </>
  );
}

const mapStateToProps = state => ({ 
  results: state.resultsbox,
 });

 export default connect(
  mapStateToProps
)(ResultBox);