import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
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
  const { infos } = benevole;
  const benevoleFullName = `${infos.prenom} ${infos.nom}`;

  return (
    <Card className={labelProps.size==="large" ? null : classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt={benevoleFullName} src={infos.photo_du_benevole ? infos.photo_du_benevole : "/static/logo-sga.svg"} className={labelProps.size==="large" ? classes.bigAvatar : classes.smallAvatar} />
          </Grid>
          <Grid item xs container> 
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" component="h3" color="primary">
                  {benevoleFullName}
                </Typography>
                {infos.date_anniv ? <Typography className={classes.pos} variant="body2" color="textSecondary"><FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {infos.date_anniv}</Typography> : null}
                <Hidden xsDown>{
                  infos.fonction.map((fonction) => {
                    switch(fonction) {
                      case 'Coach':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> *{infos.niveau_de_formation_entraineur}* :{infos.groupe_entraine.map((groupe, index) => {
                              return <span key={fonction+groupe}> {groupe}{index < infos.groupe_entraine.length - 1 ? ',' : ''}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Juge':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> *{infos.niveau_de_formation_juge}* :{infos.agres.map((agr, index) => {
                              return <span key={fonction+agr}> {agr}{index < infos.agres.length - 1 ? ',' : ''}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Bureau':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> : {infos.role}
                            </Typography>
                          </div>
                        );
                      case 'Gymnaste':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> :{infos.groupe_de_pratique.map((gpprat, index) => {
                              return <span key={fonction+gpprat}> {gpprat}{index < infos.groupe_de_pratique.length - 1 ? ',' : ''}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Secrétaire':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <b>{fonction}</b>
                            </Typography>
                          </div>
                        );
                      default:
                        return (
                            <div key={fonction}>
                                <Typography className={classes.pos} variant="body2" className={classes.fct}>
                                  <b>{fonction}</b>
                                </Typography>
                            </div>
                        );
                    }
                  })
                }</Hidden>
                <Hidden smUp>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
            infos.fonction.map((fonction) => {
              switch(fonction) {
                case 'Coach':
                  return (
                    <div key={fonction}>
                      <Typography className={classes.pos} variant="body2" className={classes.fct}>
                      <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> *{infos.niveau_de_formation_entraineur}* :{infos.groupe_entraine.map((groupe, index) => {
                        return <span key={fonction+groupe}> {groupe}{index < infos.groupe_entraine.length - 1 ? ',' : ''}</span>
                      })}
                      </Typography>
                    </div>
                  );
                case 'Juge':
                  return (
                    <div key={fonction}>
                      <Typography className={classes.pos} variant="body2" className={classes.fct}>
                      <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> *{infos.niveau_de_formation_juge}* :{infos.agres.map((agr, index) => {
                        return <span key={fonction+agr}> {agr}{index < infos.agres.length - 1 ? ',' : ''}</span>
                      })}
                      </Typography>
                    </div>
                  );
                case 'Bureau':
                  return (
                    <div key={fonction}>
                      <Typography className={classes.pos} variant="body2" className={classes.fct}>
                      <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> *{infos.role}*
                      </Typography>
                    </div>
                  );
                case 'Gymnaste':
                  return (
                    <div key={fonction}>
                      <Typography className={classes.pos} variant="body2" className={classes.fct}>
                      <Typography className={classes.pos} component="span" variant="body2" color="secondary"><b>{fonction}</b></Typography> :{infos.groupe_de_pratique.map((gpprat, index) => {
                        return <span key={fonction+gpprat}> {gpprat}{index < infos.groupe_de_pratique.length - 1 ? ',' : ''}</span>
                      })}
                      </Typography>
                    </div>
                  );
                case 'Secrétaire':
                  return (
                    <div key={fonction}>
                      <Typography className={classes.pos} variant="body2" className={classes.fct}>
                      <b>{fonction}</b>
                      </Typography>
                    </div>
                  );
                default:
                  return (
                      <div key={fonction}>
                          <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <b>{fonction}</b>
                          </Typography>
                      </div>
                  );
              }
            })
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}