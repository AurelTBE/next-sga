import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  logo: {
    width: '50%',
    padding: '10px'
  },
}));



export default function Header() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <img src="/static/logo-sga.svg" alt="Saint Georges d'Argenteuil" className={classes.logo} />
      </Grid>
      <List>
        <Link href="/organisation" as={`/organisation`}>
          <ListItemLink>
            <ListItemText primary="Organisation" />
          </ListItemLink>
        </Link>
        <Link href="/SGA" as={`/SGA`}>
          <ListItemLink>
            <ListItemText primary="SGA" />
          </ListItemLink>
        </Link>
        <Link href="/sectionFeminine" as={`/section-feminine`}>
          <ListItemLink>
            <ListItemText primary="SGA section féminine" />
          </ListItemLink>
        </Link>
        <Link href="/calendrier" as={`/calendrier`}>
          <ListItemLink>
            <ListItemText primary="Calendrier" />
          </ListItemLink>
        </Link>
        <Link href="/resultats" as={`/resultats`}>
          <ListItemLink>
            <ListItemText primary="Résultats" />
          </ListItemLink>
        </Link>
        <Link href="/medias" as={`/medias`}>
          <ListItemLink>
            <ListItemText primary="Médias" />
          </ListItemLink>
        </Link>
        <Link href="/archives" as={`/archives`}>
          <ListItemLink>
            <ListItemText primary="Archives" />
          </ListItemLink>
        </Link>
        <Link href="/connexion" as={`/connexion`}>
          <ListItemLink>
            <ListItemText primary="Connexion" />
          </ListItemLink>
        </Link>
        <Link href="/contact" as={`/contact`}>
          <ListItemLink>
            <ListItemText primary="Contact" />
          </ListItemLink>
        </Link>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)} >
            <MenuIcon />
          </IconButton>
          <Link href="/" >
                <Button color="inherit" ><Typography variant="h6" color="inherit" className={classes.grow}>SGA Gym Féminine</Typography></Button>
          </Link>
          <IconButton color="inherit">
                <AccountCircle />
          </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}