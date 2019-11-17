import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

const useStyles = makeStyles (theme => ({
  media: {
    height: 140,
  },
  titlesize: {
    fontSize: 30,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    }
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  yellow: {
    color: theme.palette.secondary.main,
  },
}));

export default function LivreCard({livre}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea href={livre.fichier} target="_blank" rel="noopener" download>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.titlesize}>
            <FontAwesomeIcon icon={faFilePdf} className={clsx(classes.leftIcon, classes.yellow)} />{livre.titre_du_livre} {livre.saison}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}