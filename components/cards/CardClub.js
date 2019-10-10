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
import { red } from '@material-ui/core/colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

// Modal
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
  link: {
    margin: theme.spacing(1),
    marginLeft: 0,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.secondary.main,
     },
  },
  linkblock: {
    marginLeft: 4,
    paddingBottom: 2,
    [theme.breakpoints.down('sm')]: {
        paddingBottom: 10,
      },
  },
  linkicon: {
    color: theme.palette.secondary.main,
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
  actuBtn: {
    display: 'block',
    textAlign: 'initial'
  },
  logo: {
        maxWidth: "100%"
  },
  link: {
    textDecoration: 'none',
  },
  contentsize: {
    fontSize: 22,
    [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      }
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
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
  red: {
    color: theme.palette.primary.main,
  },
  yellow: {
    color: theme.palette.secondary.main,
  },
}));

function CardClub({sga, setactivideo, vidplay}) {
  const classes = useStyles();
  const theme = useTheme();
  const {categorie, photo, historique, videos, membres_ca} = sga;

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
                title={<Typography variant="h6" component="h3" className={classes.header} >{categorie}</Typography>}
              />
            </ListItem>
          </Hidden>
          <Grid item xs={12} md={6} lg={4} container direction="column">
            <CardMedia
            className={classes.media}
            image={photo ? photo : "/static/LOGO-CERTIFICATION.jpg"}
            title={categorie}
            />
          </Grid>
          <CardContent>
            <Hidden smDown>
              <Typography variant={isSmallScreen ? "h6" : "h4"} component="h3" color="primary" className={classes.sectiontitle} gutterBottom>
              {categorie}
              </Typography>
            </Hidden>
            <Grid item className={classes.contentspacing}>
              {historique}
            </Grid>
            <Grid item className={classes.contentspacing}>
              {videos && (
                videos.map(video => (
                  <ButtonBase onClick={() => handleClickOpen(video)} key={video.titre_de_la_video}>
                    <Typography variant={isSmallScreen ? 'h6' : 'body2'} color="textSecondary" className={classes.contentsize}>
                        <FontAwesomeIcon icon={faYoutube} className={clsx(classes.leftIcon, classes.iconSmall, classes.red)} /> {video.titre_de_la_video}            
                    </Typography>
                  </ButtonBase>
                ))
              )}
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
          {vidplay && <Typography>{vidplay.titre_de_la_video}</Typography>}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.wrapper} >
          {vidplay && (
            isSmallScreen ?
            <YouTubePlayer url={vidplay.lien_youtube} width="100%" className={classes.player} controls />
            :
            <YouTubePlayer url={vidplay.lien_youtube} controls />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default connect(
    state => state,
    { setactivideo }
  )(CardClub)