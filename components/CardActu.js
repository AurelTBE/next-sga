import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { red } from '@material-ui/core/colors';
import Link from "next/link";
import he from 'he';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  logo: {
        maxWidth: "100%"
    }
}));

export default function ActuCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const { id, titre, exerpt, img, slug } = props;

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Link href="/actus/[id]" as={`/actus/${slug}`}>
        <Card className={classes.card}>
          <ListItemLink>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  <FontAwesomeIcon icon={faDragon} />
                </Avatar>
              }
              title={he.decode(titre)}
            />
          </ListItemLink>
          <CardMedia
            className={classes.media}
            image={img ? img : "/static/LOGO-CERTIFICATION.jpg"}
            title={he.decode(titre)}
          />
          <CardContent>
            <Typography 
              component="div" 
              dangerouslySetInnerHTML={ {
                __html: exerpt
                } }>
            </Typography>
          </CardContent>
        </Card>
      </Link>
  );
}