import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
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
  fct: {
    marginBottom: 0,
  },
});

export default function CardBenevole(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  const { benevole } = props;
  const { infos } = benevole;
  const benevoleFullName = `${infos.prenom} ${infos.nom}`;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt={benevoleFullName} src={infos.photo_du_benevole ? infos.photo_du_benevole : "/static/logo-sga.svg"} className={labelProps.size==="large" ? classes.bigAvatar : classes.smallAvatar} />
            <Grid container justify="center">
              {infos.date_anniv ? 
                <Hidden smUp>
                  <Typography className={classes.pos} variant="body2" color="textSecondary">
                    <FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {infos.date_anniv}
                  </Typography>
                </Hidden>
               : null}
            </Grid>
          </Grid>
          <Grid item xs container> 
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" component="h2" color="primary">
                  {benevoleFullName}
                </Typography>
                {infos.date_anniv ? <Hidden xsDown><Typography className={classes.pos} variant="body2" color="textSecondary"><FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {infos.date_anniv}</Typography></Hidden> : null}
                {
                  infos.fonction.map((fonction) => {
                    switch(fonction) {
                      case 'Coach':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                              <b>{fonction}</b> *{infos.niveau_de_formation_entraineur}* :{infos.groupe_entraine.map((groupe, index) => {
                              return <span key={fonction+groupe}> {groupe}{index < infos.groupe_entraine.length - 1 ? ',' : ''}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Juge':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <b>{fonction}</b> *{infos.niveau_de_formation_juge}* :{infos.agres.map((agr, index) => {
                              return <span key={fonction+agr}> {agr}{index < infos.agres.length - 1 ? ',' : ''}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Bureau':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <b>{fonction}</b> *{infos.role}*
                            </Typography>
                          </div>
                        );
                      case 'Gymnaste':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                            <b>{fonction}</b> :{infos.groupe_de_pratique.map((gpprat, index) => {
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}