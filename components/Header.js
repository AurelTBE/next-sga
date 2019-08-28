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

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faTrophy, faArchive, faEnvelope, faUserCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faImages } from '@fortawesome/free-regular-svg-icons';



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
  icons: {
    fontSize: '20px'
  },
  menu: {
    paddingTop: '12px'
  }
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
      <Link href="/" >
        <a>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <img src="/static/logo-sga.svg" alt="Saint Georges d'Argenteuil" className={classes.logo} />
          </Grid>
        </a>
      </Link>
      <List className={classes.menu}>
        <Link href="/SGA" as={`/SGA`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faDragon} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="SGA" />
          </ListItemLink>
        </Link>
        <Link href="/gymfeminine" as={`/gymfeminine`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faFlag} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Gym féminine" />
          </ListItemLink>
        </Link>
        <Link href="/calendrier" as={`/calendrier`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faCalendarAlt} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Calendrier" />
          </ListItemLink>
        </Link>
        <Link href="/resultats" as={`/resultats`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faTrophy} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Résultats" />
          </ListItemLink>
        </Link>
        <Link href="/medias" as={`/medias`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faImages} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Médias" />
          </ListItemLink>
        </Link>
        <Link href="/archives" as={`/archives`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faArchive} className={classes.icons} /></ListItemIcon>            
            <ListItemText primary="Archives" />
          </ListItemLink>
        </Link>
        <Link href="/connexion" as={`/connexion`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faUserCircle} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Connexion" />
          </ListItemLink>
        </Link>
        <Link href="/contact" as={`/contact`}>
          <ListItemLink>
            <ListItemIcon><FontAwesomeIcon icon={faEnvelope} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemLink>
        </Link>
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
          <Link href="/connexion" as={`/connexion`}>
            <IconButton color="inherit">
                <AccountCircle />
            </IconButton>
          </Link>
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