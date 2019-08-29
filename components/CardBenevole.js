import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
  const benevoleFullName = `${benevole.acf.prenom} ${benevole.acf.nom}`;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt={benevoleFullName} src={benevole.acf.photo_du_benevole ? benevole.acf.photo_du_benevole : "/static/logo-sga.svg"} className={labelProps.size==="large" ? classes.bigAvatar : classes.smallAvatar} />
            {labelProps.size==="small" && benevole.acf.date_anniv ? <span><FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {benevole.acf.date_anniv}</span> : null}
          </Grid>
          <Grid item xs container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" component="h2">
                  {benevoleFullName}
                </Typography>
                {labelProps.size==="large" && benevole.acf.date_anniv ? <Typography className={classes.pos} variant="body2" color="textSecondary"><FontAwesomeIcon icon={faBirthdayCake} className={classes.icons} /> {benevole.acf.date_anniv}</Typography> : null}
                <Typography className={classes.pos} variant="body1" className={classes.fct}><b>Fonction(s) :</b></Typography>
                {
                  benevole.acf.fonction.map((fonction) => {
                    switch(fonction) {
                      case 'Coach':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                              {fonction} ({benevole.acf.niveau_de_formation_entraineur}) :{benevole.acf.groupe_entraine.map((groupe) => {
                              return <span key={fonction+groupe}> {groupe}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Juge':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                              {fonction} ({benevole.acf.niveau_de_formation_juge}) :{benevole.acf.agres.map((agr) => {
                              return <span key={fonction+agr}> {agr}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      case 'Bureau':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                              {fonction} ({benevole.acf.role})
                            </Typography>
                          </div>
                        );
                      case 'Gymnaste':
                        return (
                          <div key={fonction}>
                            <Typography className={classes.pos} variant="body2" className={classes.fct}>
                              {fonction} :{benevole.acf.groupe_de_pratique.map((gpprat) => {
                              return <span key={fonction+gpprat}> {gpprat}</span>
                            })}
                            </Typography>
                          </div>
                        );
                      default:
                        return (
                            <div key={fonction}>
                                <Typography className={classes.pos} variant="body2" className={classes.fct}>
                                    {fonction}
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