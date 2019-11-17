import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';

const useStyles = makeStyles (theme => ({
  media: {
    height: 140,
  },
  titlesize: {
    textAlign: "center",
    color: theme.palette.secondary.main,
    fontSize: 30,
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    }
  },
  titleblock: {
    marginBottom: theme.spacing(2),
  },
  listsize: {
    fontSize: 22,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    }
  },
  leftIcon: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  yellow: {
    color: theme.palette.secondary.main,
  },
}));

export default function SiglesCard({fichesigle}) {
  const classes = useStyles();

  const {niveau, fiche, image} = fichesigle;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box border={2} borderColor="secondary.main" p={{ xs: 2 }} className={classes.titleblock}>
          <Typography variant="h5" component="h2" className={classes.titlesize}>
            {niveau}
          </Typography>
        </Box>
        {fiche.map(notation => (
          <CardActionArea key={notation.fichier} href={notation.fichier} target="_blank" rel="noopener" download>
            <Typography variant="h6" component="h2" className={classes.listsize}>
              <FontAwesomeIcon icon={faFileAlt} className={clsx(classes.leftIcon, classes.yellow)}/>{notation.agres}
            </Typography>
          </CardActionArea>
        ))}
      </CardContent>
    </Card>
  );
}