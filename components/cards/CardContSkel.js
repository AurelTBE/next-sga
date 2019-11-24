import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
  },
  header: {
    color: theme.palette.primary.light,
    fontSize: 16,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function CardContSkel() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <ListItem>
          <CardHeader
            avatar={
              <Skeleton variant="circle" width={40} height={40} />
            }
            title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          />
        </ListItem>
        <Skeleton variant="rect" className={classes.media} />
        <CardContent>
          <Skeleton height={10} style={{ marginBottom: 6 }} />
          <Skeleton height={10} style={{ marginBottom: 6 }} />
          <Skeleton height={10} width="80%" />
        </CardContent>
      </CardActionArea>
    </Card>
      
  );
}