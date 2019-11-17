import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

// Modal
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import { setactivideo } from '../../redux/actions/contActions'

// Player
import YouTubePlayer from 'react-player/lib/players/YouTube';

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.down('sm')]: {
        height: "100%",
      },
  },
  header: {
      color: theme.palette.primary.light,
  },
  cardhead: {
    paddingLeft: theme.spacing(1),
    paddingBottom: 0,
  },
  link: {
    margin: theme.spacing(1),
    marginLeft: 0,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.secondary.main,
     },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  contentsize: {
    fontSize: 22,
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      }
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fontSize: 30,
  },
  red: {
    color: theme.palette.primary.main,
  },
  yellow: {
    color: theme.palette.secondary.main,
  },
  sectiontitle: {
    paddingBottom: theme.spacing(2),
  },
  contentspacing: {
    paddingLeft: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.background.paper,
  },
  dialoguetitle: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main,
  },
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      paddingTop: '56.25%',
    },
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

function CardSections({autresection, setactivideo}) {
  const classes = useStyles();
  const theme = useTheme();
  const {section, photo, site_internet, video} = autresection;

  const [open, setOpen] = React.useState(false);
  
  function handleClickOpen(vid) {
    setactivideo(vid)
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Hidden mdUp>
            <ListItem>
              <CardHeader
                avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    <FontAwesomeIcon icon={faDragon} />
                </Avatar>
                }
                title={<Typography variant="h6" component="h3" className={classes.header} >{section}</Typography>}
                className={classes.cardhead}
              />
            </ListItem>
          </Hidden>
          <Grid item xs={12} md={6} lg={4} container direction="column">
            <CardMedia
            className={classes.media}
            image={photo ? photo : "/static/LOGO-CERTIFICATION.jpg"}
            title={section}
            />
          </Grid>
          <CardContent>
            <Hidden smDown>
              <Typography variant={isSmallScreen ? "h6" : "h4"} component="h3" color="primary" className={classes.sectiontitle} gutterBottom>
                {section}
              </Typography>
            </Hidden>
            <Grid item className={classes.contentspacing}>
              <a href={site_internet} target="_blank" rel="noopener" className={classes.link}>
                <Grid container  direction="row" justify="flex-start" alignItems="center" className={classes.contentsize}>
                  <FontAwesomeIcon icon={faGlobe} className={clsx(classes.leftIcon, classes.yellow)} /> Site internet            
                </Grid>
              </a>
              {video &&
                <ButtonBase onClick={() => handleClickOpen(video)}>
                  <Grid container  direction="row" justify="flex-start" alignItems="center" className={classes.contentsize}>
                    <FontAwesomeIcon icon={faYoutube} className={clsx(classes.leftIcon, classes.red)} /> Vidéo            
                  </Grid>
                </ButtonBase>
              }
            </Grid>
          </CardContent>
        </Grid>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth={false}
        fullScreen={isSmallScreen}
      >
        <DialogTitle id="responsive-dialog-title" className={classes.dialoguetitle}>
          {video && <Typography>{section}</Typography>}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.wrapper} >
          {video && (
            isSmallScreen ?
            <YouTubePlayer url={video} width="100%" className={classes.player} controls />
            :
            <YouTubePlayer url={video} controls />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default connect(
    state => state,
    { setactivideo }
  )(CardSections)