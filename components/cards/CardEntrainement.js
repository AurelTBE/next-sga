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

export default function CardEntrainement(props) {
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

  const { entrainement } = props;
  const { infos } = entrainement;

  return (
    <Card className={labelProps.size==="large" ? null : classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={3} container direction="column">
          <CardMedia
            className={classes.media}
            image={entrainement.couverture ? entrainement.couverture : "/static/LOGO-CERTIFICATION.jpg"}
            title={entrainement.title}
          />
        </Grid>
        <CardContent>
          <Typography variant="h5" component="h3" color="primary" gutterBottom>
            {entrainement.title}
          </Typography>
          <Typography variant="subtitle1">
            Saison {entrainement.saison} - Prix de la cotisation {entrainement.cotisation}€
          </Typography>
          <Typography variant="body1">
            Années de naissance : {entrainement.annees_de_naissance}
          </Typography>
          {entrainement.creneaux.length > 1 ? 
            <Typography component="div" variant="body1">
              Créneaux : 
            {entrainement.creneaux.map((creneau, index) => (            
            <Typography component="div" variant="body1" className={classes.indent} key={creneau+index}>{creneau.jour} ({creneau.horaire_de_debut} - {creneau.horaire_de_fin}), {creneau.lieu}</Typography>
            ))}
            </Typography>
            :
            <Typography component="div" variant="body1">Créneau : {entrainement.creneaux[0].jour} ({entrainement.creneaux[0].horaire_de_debut} - {entrainement.creneaux[0].horaire_de_fin}), {entrainement.creneaux[0].lieu}</Typography>
          }
        </CardContent>
      </Grid>
    </Card>
  );
}