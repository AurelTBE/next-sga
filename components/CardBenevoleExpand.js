import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function CardBenevole(props) {
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

  const { benevole } = props;
  const benevoleFullName = `${benevole.infos.prenom} ${benevole.infos.nom}`;

  return (
    <Card className={classes.card} onClick={handleExpandClick}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item alignItems="center">
            <Avatar alt={benevoleFullName} src={benevole.infos.photo_du_benevole ? benevole.infos.photo_du_benevole : "/static/logo-sga.svg"} className={labelProps.size==="large" ? classes.bigAvatar : classes.smallAvatar} />
            {labelProps.size==="small" && benevole.infos.date_anniv ? <span><FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {benevole.infos.date_anniv}</span> : null}
          </Grid>
          <Grid item xs container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" component="h2">
                  {benevoleFullName}
                </Typography>
                {labelProps.size==="large" && benevole.infos.date_anniv ? <Typography className={classes.pos} variant="body2" color="textSecondary"><FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {benevole.infos.date_anniv}</Typography> : null}
                <Typography className={classes.pos} variant="body1" color="textSecondary">Fonction(s) :</Typography>
                {
                  benevole.infos.fonction.map((fonction) => {
                    switch(fonction) {
                      case 'Coach':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body" color="textSecondary">
                              {fonction} ({benevole.infos.niveau_de_formation_entraineur}){expanded ? ` :${benevole.infos.groupe_entraine.map((groupe) => {
                              return ` ${groupe}`
                            })}` : null}
                            </Typography>

                          </div>
                        );
                      case 'Juge':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body" color="textSecondary">
                              {fonction} ({benevole.infos.niveau_de_formation_juge}){expanded ? ` :${benevole.infos.agres.map((agr) => {
                              return ` ${agr}`
                            })}` : null}
                            </Typography>
                          </div>
                        );
                      case 'Bureau':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body" color="textSecondary">
                              {fonction} ({benevole.infos.role})
                            </Typography>
                          </div>
                        );
                      case 'Gymnaste':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body" color="textSecondary">
                              {fonction}{expanded ? ` :${benevole.infos.groupe_de_pratique.map((gpprat) => {
                              return ` ${gpprat}`
                            })}` : null}
                            </Typography>
                          </div>
                        );
                      default:
                        return (
                          <Typography className={classes.pos} variant="body" color="textSecondary">
                            {fonction}
                          </Typography>
                        );
                    }
                  })
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}