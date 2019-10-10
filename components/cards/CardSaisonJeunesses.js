import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.down('sm')]: {
        height: "100%",
      },
  },
  header: {
      color: theme.palette.primary.light,
  },
  cardhead: {
    paddingLeft: theme.spacing(1),
    paddingBottom: 0,
  },
  link: {
    margin: theme.spacing(1),
    marginLeft: 0,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.secondary.main,
     },
  },
  linkblock: {
    marginLeft: 4,
    paddingBottom: 2,
    [theme.breakpoints.down('sm')]: {
        paddingBottom: 10,
      },
  },
  linkicon: {
    color: theme.palette.secondary.main,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function CardSaisonJeunesses({saison, results}) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Card className={classes.card}>
      <Grid container spacing={2}>
        <Hidden mdUp>
          <ListItem>
            <CardHeader
              avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                  <FontAwesomeIcon icon={faTrophy} />
              </Avatar>
              }
              title={<Typography variant="h6" component="h3" className={classes.header} >Saison {saison.saison}</Typography>}
              className={classes.cardhead}
            />
          </ListItem>
        </Hidden>
        <Grid item xs={12} md={6} lg={4} container direction="column">
            <CardMedia
            className={classes.media}
            image={saison.photo ? saison.photo : "/static/LOGO-CERTIFICATION.jpg"}
            title={saison.saison}
            />
        </Grid>
        <CardContent>
        <Hidden smDown>
            <Typography variant={isSmallScreen ? "h6" : "h4"} component="h3" color="primary" gutterBottom>
            Saison {saison.saison}
            </Typography>
        </Hidden>
        {results.jeunesses.map(result => (
          result.saison == saison.saison && 
            <div key={saison.saison + result.title} className={classes.linkblock}>
                <Link as={`/resultats/${result.slug}`} href="/resultats/[id]"><a className={classes.link}><FontAwesomeIcon icon={faArrowCircleRight} className={classes.linkicon} /> {result.title}</a></Link>
            </div>
        ))}
        </CardContent>
      </Grid>
    </Card>
  );
}