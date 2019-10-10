import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faBirthdayCake, faEuroSign, faHourglassHalf, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import StarBorderIcon from '@material-ui/icons/StarBorder';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
  card: {
    padding: 0,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.up('md')]: {
      paddingTop: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '56.25%',
    },
  },
  cardhead: {
    paddingLeft: theme.spacing(1),
    paddingBottom: 0,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 32,
  },
  title: {
    fontSize: 19,
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
  mainsize: {
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    }
  },
  paddingmobile: {
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  subtitle: {
    fontSize: 18,
  },
  mobilesubtitle: {
    fontSize: 18,
    color: theme.palette.primary.light,
  },
  subsize: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    }
  },
  contentsize: {
    fontSize: 22,
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      }
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  red: {
    color: theme.palette.primary.light,
  },
  yellow: {
    color: theme.palette.secondary.main,
  },
  indent: {
    paddingLeft: theme.spacing(3),
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

export default function CardEntrainement(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  } {/* Pour implémenter les coachs dans un panel extensible */}

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  const { entrainement } = props;
  const { infos } = entrainement;

  return (
    <Card className={labelProps.size==="large" ? null : classes.card}>
      <Grid container spacing={2}>
        <Hidden mdUp>
          <ListItem>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  <StarBorderIcon fontSize="inherit" />
                </Avatar>
                }
              title={<Typography variant="h6" component="h3" color="primary" className={classes.title}>{entrainement.title}</Typography>}
              className={classes.cardhead}
            />
          </ListItem>
        </Hidden>
        <Grid item xs={12} md={6} lg={5} xl={4} container direction="column">
          <CardMedia
            className={classes.media}
            image={entrainement.couverture ? entrainement.couverture : "/static/LOGO-CERTIFICATION.jpg"}
            title={entrainement.title}
          />
        </Grid>
        <CardContent className={classes.paddingmobile}>
          <Hidden smDown>
            <Typography variant="h4" component="h3" color="primary" gutterBottom>
              {entrainement.title}
            </Typography>
          </Hidden>
          <Grid container direction="row" justify={isSmallScreen ? "center" : "flex-start"} alignItems="center">
          <Typography variant="subtitle1" className={isSmallScreen ? classes.mobilesubtitle : classes.subtitle}>
            <Hidden smDown>
              <FontAwesomeIcon icon={faCalendarAlt} className={clsx(classes.leftIcon, classes.red)} />
            </Hidden>
            Saison {entrainement.saison}
          </Typography>
          </Grid>
          <Typography variant="subtitle1" className={classes.mainsize}>
            <FontAwesomeIcon icon={faBirthdayCake} className={clsx(classes.leftIcon, classes.red)} />Années de naissance : {entrainement.annees_de_naissance}
          </Typography>
          {entrainement.creneaux &&
            entrainement.creneaux.length > 1 ? 
              <Typography variant="subtitle1">
                <Grid container  direction="row" justify="flex-start" alignItems="center">
                  <FontAwesomeIcon icon={faClock} className={clsx(classes.leftIcon, classes.red)} /><Typography variant="subtitle1" className={classes.mainsize}>Créneaux :</Typography>
                </Grid>
                {entrainement.creneaux.map((creneau, index) => (
                  creneau.jour &&
                    creneau.jour.length > 1 ?
                    <Grid item key={creneau+index}>
                      <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                        <FontAwesomeIcon icon={faHourglassHalf} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{creneau.jour[0]} {`&`} {creneau.jour[1]} ({creneau.horaire_de_debut} - {creneau.horaire_de_fin})</Typography>
                      </Grid>
                      <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{creneau.lieu}</Typography>
                      </Grid>
                    </Grid>
                    :
                    <Grid item key={creneau+index}>
                      <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                        <FontAwesomeIcon icon={faHourglassHalf} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{creneau.jour} ({creneau.horaire_de_debut} - {creneau.horaire_de_fin})</Typography>
                      </Grid>
                      <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{creneau.lieu}</Typography>
                      </Grid>
                    </Grid>
                ))}
              </Typography>
            :
              entrainement.creneaux[0].jour &&
                entrainement.creneaux[0].jour.length > 1 ?
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <FontAwesomeIcon icon={faClock} className={clsx(classes.leftIcon, classes.red)} /><Typography variant="subtitle1" className={classes.mainsize}>Créneaux :</Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                      <FontAwesomeIcon icon={faHourglassHalf} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{entrainement.creneaux[0].jour[0]} {`&`} {entrainement.creneaux[0].jour[1]} ({entrainement.creneaux[0].horaire_de_debut} - {entrainement.creneaux[0].horaire_de_fin})</Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{entrainement.creneaux[0].lieu}</Typography>
                    </Grid>
                  </Grid>
                :  
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <FontAwesomeIcon icon={faClock} className={clsx(classes.leftIcon, classes.red)} /><Typography variant="subtitle1" className={classes.mainsize}>Créneau :</Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                      <FontAwesomeIcon icon={faHourglassHalf} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{entrainement.creneaux[0].jour} ({entrainement.creneaux[0].horaire_de_debut} - {entrainement.creneaux[0].horaire_de_fin})</Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" className={clsx(classes.contentsize, classes.indent)}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className={clsx(classes.leftIcon, classes.yellow)} /><Typography component="div" variant="body1" className={classes.subsize}>{entrainement.creneaux[0].lieu}</Typography>
                    </Grid>
                  </Grid>
          }
          {entrainement.title !== "Individuelles" && 
            <Typography variant="subtitle1" className={classes.mainsize}>
              <FontAwesomeIcon icon={faEuroSign} className={clsx(classes.leftIcon, classes.red)} />Cotisation annuelle : {entrainement.cotisation}€
            </Typography>
          }
        </CardContent>
      </Grid>
    </Card>
  );
}