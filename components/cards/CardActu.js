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
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'

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
  excerpt: {
    whiteSpace: 'pre-line',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function ActuCard(props) {
  const classes = useStyles();

  const { titre, excerpt, img, slug } = props;

  return (
    <Card className={classes.card}>
      <Link href="/actus/[id]" as={`/actus/${slug}`}>
        <CardActionArea>
          <ListItem>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  <FontAwesomeIcon icon={faDragon} />
                </Avatar>
              }
              title={<Typography variant="body2" component="h3" className={classes.header}>{titre}</Typography>}
            />
          </ListItem>
          <CardMedia
            className={classes.media}
            image={img ? img : "/static/LOGO-CERTIFICATION.jpg"}
            title={titre}
          />
          <CardContent>
            <Typography className={classes.excerpt}>{excerpt}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
      
  );
}