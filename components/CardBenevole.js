import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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
        </Grid>
        <Grid item xs container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" component="h2">
                  {benevoleFullName}
                </Typography>
        {
            benevole.acf.fonction.map((fonction) => {
                switch(fonction) {
                  case 'Coach':
                    return (
                      <div key={fonction}>
                        <Typography className={classes.pos} color="textSecondary">
                          {fonction}
                        </Typography>
                        {benevole.acf.groupe_entraine.map((groupe) => {
                          return <Typography variant="body2" component="span" key={groupe}> {groupe}</Typography>
                        })}
                      </div>
                    );
                  case 'Juge':
                    return (
                      <div key={fonction}>
                        <Typography className={classes.pos} color="textSecondary">
                          {fonction}
                        </Typography>
                        <Typography variant="body2" component="span">{benevole.acf.niveau_de_formation_juge}</Typography>
                      </div>
                    );
                  case 'Bureau':
                    return (
                      <div key={fonction}>
                        <Typography className={classes.pos} color="textSecondary">
                          {fonction}
                        </Typography>
                        <Typography variant="body2" component="span"> {benevole.acf.role}</Typography>
                      </div>
                    );
                  case 'Gymnaste':
                    return (
                      <div key={fonction}>
                        <Typography className={classes.pos} color="textSecondary">
                          {fonction}
                        </Typography>
                        {benevole.acf.groupe_de_pratique.map((groupeprat) => {
                          return <Typography variant="body2" component="span" key={groupeprat}> {groupeprat}</Typography>
                        })}
                      </div>
                    );
                  default:
                    return (
                      <Typography className={classes.pos} color="textSecondary">
                        {fonction}
                      </Typography>
                    );
                }
              }      
          )
        }
        {benevole.acf.informations_sur_le_benevole ?
        <Typography variant="body2" component="p">
          {benevole.acf.informations_sur_le_benevole}
        </Typography>
        : null}
        </Grid>
        </Grid>
        </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}