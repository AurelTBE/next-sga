import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useRouter } from 'next/router'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Redux
import { connect } from 'react-redux';
import { setactivhometab, setactivsgatab, setactivgftab, setactivresultab, setactivmediatab, setactivjugestab } from '../redux/actions/navActions';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faTrophy, faArchive, faEnvelope, faUserCircle, faFlag, faFileSignature, faTools } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faImages } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

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
  list: {
    width: 220,
  },
  logocont: {
    paddingTop: theme.spacing(2),
  },
  logobtn: {
    borderRadius: "50%",
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  logo: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  icons: {
    fontSize: '20px'
  },
  menu: {
    paddingTop: '12px'
  },
  fb: {
    fontSize: '20px',
    color: "#3b5998",
  },
}));

function Header({isAuthenticated, role, setactivhometab, setactivsgatab, setactivgftab, setactivresultab, setactivmediatab, setactivjugestab }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const router = useRouter()

  function handleNav(link) {
    switch (link) {
      case '/':
          return (
            setactivhometab(0),
            router.push(link)
          );
      case '/SGA':
        return (
          setactivsgatab(0),
          router.push(link)
        );
      case '/gymfeminine':
          return (
            setactivgftab(0),
            router.push(link)
            );
      case '/resultats':
        return (
          setactivresultab(0),
          router.push(link)
        );
      case '/medias':
        return (
          setactivmediatab(0),
          router.push(link)
        );
      case '/juges':
        return (
          setactivjugestab(0),
          router.push(link)
        );
      default:
          return router.push(link);
    }
  }

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="menu"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        onClick={() => handleNav('/')}
        className={classes.logocont}
      >
        <ButtonBase className={classes.logobtn}>
          <img src="/static/logo-sga.svg" alt="Saint Georges d'Argenteuil" className={classes.logo}/>
        </ButtonBase>
      </Grid>
      <List className={classes.menu}>
        <ListItem button onClick={() => handleNav('/SGA')}>
          <ListItemIcon><FontAwesomeIcon icon={faDragon} className={classes.icons} /></ListItemIcon>
          <ListItemText primary="SGA" />
        </ListItem>
        <ListItem button onClick={() => handleNav('/gymfeminine')}>
          <ListItemIcon><FontAwesomeIcon icon={faFlag} className={classes.icons} /></ListItemIcon>
          <ListItemText primary="Gym féminine" />
        </ListItem>
        <ListItem button onClick={() => handleNav('/calendrier')}>
          <ListItemIcon><FontAwesomeIcon icon={faCalendarAlt} className={classes.icons} /></ListItemIcon>
          <ListItemText primary="Calendrier" />
        </ListItem>
        <ListItem button onClick={() => handleNav('/resultats')}>
          <ListItemIcon><FontAwesomeIcon icon={faTrophy} className={classes.icons} /></ListItemIcon>
          <ListItemText primary="Résultats" />
        </ListItem>
        <ListItem button onClick={() => handleNav('/medias')}>
          <ListItemIcon><FontAwesomeIcon icon={faImages} className={classes.icons} /></ListItemIcon>
          <ListItemText primary="Médias" />
        </ListItem>
        {
          role ? (
            role.includes("administrator") || role.includes("Juge") ?
              <ListItem button onClick={() => handleNav('/juges')}>
                <ListItemIcon><FontAwesomeIcon icon={faFileSignature} className={classes.icons} /></ListItemIcon>            
                <ListItemText primary="Juges" />
              </ListItem>
            : 
            null 
            ) 
            : 
          null
        }
        <ListItem button onClick={() => handleNav('/archives')}>
          <ListItemIcon><FontAwesomeIcon icon={faArchive} className={classes.icons} /></ListItemIcon>            
          <ListItemText primary="Archives" />
        </ListItem>
        {!isAuthenticated && 
          <ListItem button onClick={() => handleNav('/connexion')}>
            <ListItemIcon><FontAwesomeIcon icon={faUserCircle} className={classes.icons} /></ListItemIcon>
            <ListItemText primary="Connexion" />
          </ListItem>
        }
        <ListItem button onClick={() => handleNav('/contact')}>
          <ListItemIcon><FontAwesomeIcon icon={faEnvelope} className={classes.icons} /></ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component="a" aria-label="Facebook" href="https://www.facebook.com/sgagymfeminine/?fref=ts" target="_blank" rel="noopener">
          <ListItemIcon><FontAwesomeIcon icon={faFacebookSquare} className={classes.fb} /></ListItemIcon>
          <ListItemText primary="Facebook" />
        </ListItem>
        {
          role ? (
            role.includes("administrator") &&
              <ListItem button component="a" aria-label="Administration" target="_blank" rel="noopener" href={`https://sga-gymfeminine.fr/bo/wp-admin/`}>
                <ListItemIcon><FontAwesomeIcon icon={faTools} className={classes.icons} /></ListItemIcon>            
                <ListItemText primary="Administration" />
              </ListItem>
            ) 
            : 
          null
        }
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
          <Button color="inherit" onClick={() => handleNav('/')}>
            <Typography variant="h6" color="inherit" className={classes.grow}>SGA Gym Féminine</Typography>
          </Button>
          {isAuthenticated ? 
           <Link href="/profil" as={`/profil`}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
           </Link> 
           : 
           <Link href="/connexion" as={`/connexion`}>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>}
          </Grid>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
        swipeAreaWidth={20}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}

function mapStateToProps(state) {
  const role = state.authentication.token ? state.authentication.token.user_role : null
  return { 
    isAuthenticated: !!state.authentication.token,
    role: role,
  }
}

export default connect(
  mapStateToProps,
  { setactivhometab, setactivsgatab, setactivgftab, setactivresultab, setactivmediatab, setactivjugestab  }
)(Header);