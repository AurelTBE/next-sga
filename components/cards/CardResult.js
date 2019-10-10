import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
  },
  header: {
    fontSize: 16,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function ResultCard(props) {
  const classes = useStyles();

  const { titre, img, slug } = props;

  return (
    <Card className={classes.card}>
      <Link href="/resultats/[id]" as={`/resultats/${slug}`}>
        <CardActionArea>
          <ListItem>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  <FontAwesomeIcon icon={faTrophy} />
                </Avatar>
              }
              title={<Typography variant="body2" component="h3" className={classes.header}>{titre}</Typography>}
            />
          </ListItem>
          <CardMedia
            className={classes.media}
            image={img ? img : "/static/results-default.jpg"}
            title={titre}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
}