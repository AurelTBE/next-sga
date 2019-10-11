import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
  },
  cardpadding: {
    paddingBottom: theme.spacing(8),
  },
  media: {
    maxWidth: "100%",
    height: "auto",
  },
  cardmedia: {
    position: "relative",
    height: 0,
    paddingTop: '72%', // 16:9
  },
  titlesize: {
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
        fontSize: 26,
        textAlign: "center"
      }
  },
  mobilecontent: {
    padding: theme.spacing(2),
  },
  contentsize: {
    fontSize: 22,
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      }
  },
  flex: {
    flexGrow: 1,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fontSize: 30,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    fontSize: 30,
  },
  red: {
    color: theme.palette.primary.main,
  },
  yellow: {
    color: theme.palette.secondary.main,
  },
  vidsmallicon: {
    position: "absolute",
    right: 1,
    bottom: 1,
    transform: "translate(-50%, -50%)",
    color: theme.palette.background.paper,
    fontSize: 30,
  },
  paddingbottom: {
    paddingBottom: theme.spacing(2),
  },
  paddingtop: {
    paddingTop: theme.spacing(2),
  },
  lowerbottom: {
    padding: theme.spacing(2),
    "&:last-child": {
      padding: theme.spacing(2),
    }
  },
  subcontent: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 3),
    },
    padding: theme.spacing(3),
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

function CardGF({gymfem, setactivideo, vidplay}) {
  const classes = useStyles();
  const theme = useTheme();
  const {categorie, photo, historique, description, videos, agres} = gymfem;

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
      <Grid container className={classes.cardpadding}>
        <Grid item xs={12} md={6} lg={4} container direction="column">
          <img src={photo ? photo : "/static/LOGO-CERTIFICATION.jpg"} alt={categorie} className={classes.media} />
        </Grid>
        <Grid item item xs={12} md={6} lg={8}>
          {historique &&
            <>
              <Hidden smDown>
                <Paper className={classes.subcontent}>
                  <Grid container className={classes.title} justify={"flex-start"}>
                    <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
                      <Typography component="h3" variant={"h4"} className={classes.titlesize} color="primary">
                        Historique
                      </Typography>
                    </Box>
                  </Grid>
                  <Typography 
                    variant="body1"
                    component="div" 
                    dangerouslySetInnerHTML={ {
                      __html: historique
                  } } />
                </Paper>
              </Hidden>
              <Hidden mdUp>
                <div className={classes.mobilecontent}>
                  <Grid container className={classes.title} justify={"center"}>
                    <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
                      <Typography component="h3" variant={"h4"} className={classes.titlesize} color="primary">
                        Historique
                      </Typography>
                    </Box>
                  </Grid>
                  <Typography 
                    variant="body1"
                    component="div" 
                    dangerouslySetInnerHTML={ {
                      __html: historique
                  } } />
                </div>
              </Hidden>
            </>
          }
          {description &&
            <>
              <Hidden smDown>
                <Paper className={classes.subcontent}>
                  <Grid container className={classes.title} justify={"flex-start"}>
                    <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
                      <Typography component="h3" variant={"h4"} className={classes.titlesize} color="primary">
                        La gym FSCF
                      </Typography>
                    </Box>
                  </Grid>
                  <Typography 
                    variant="body1"
                    component="div" 
                    dangerouslySetInnerHTML={ {
                      __html: description
                  } } />
                </Paper>
              </Hidden>
              <Hidden mdUp>
                <div className={classes.mobilecontent}>
                  <Grid container className={classes.title} justify={"center"}>
                    <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
                      <Typography component="h3" variant={"h4"} className={classes.titlesize} color="primary">
                        La gym FSCF
                      </Typography>
                    </Box>
                  </Grid>
                  <Typography 
                    variant="body1"
                    component="div" 
                    dangerouslySetInnerHTML={ {
                      __html: description
                  } } />
                </div>
              </Hidden>
            </>
          }
          <Grid container justify="center" className={classes.paddingbottom}>
            {videos && (
              <Grid container direction="column" justify="flex-start" alignItems="center">
                {videos.map(video => (
                  <ButtonBase onClick={() => handleClickOpen(video)} key={video.titre_de_la_video}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.contentsize}>
                      <FontAwesomeIcon icon={faYoutube} className={clsx(classes.leftIcon, classes.red)} /> {video.titre_de_la_video}            
                    </Grid>
                  </ButtonBase>
                ))}
              </Grid>
            )}
          </Grid>          
        </Grid>
        <Grid container spacing={2} className={classes.paddingtop}>
          {agres.map(agr => 
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={agr.photo}>
              <Card>
                {agr.photo && (
                  agr.video ? 
                  <>
                    <CardActionArea onClick={() => handleClickOpen(agr)}>
                      <div className={classes.card}>
                        <CardMedia
                          className={classes.cardmedia}
                          image={agr.photo}
                          title={agr.agres}
                        />
                        <Hidden mdUp>
                          <PlayCircleOutlineIcon className={classes.vidsmallicon} />
                        </Hidden>
                      </div>
                      <Box display="flex" p={1}>
                        <Box p={1} flexGrow={1}>
                          <Typography variant="h5" component="h2">{agr.agres}</Typography>
                        </Box>
                        <Hidden smDown>
                          <Box p={1}>
                            <FontAwesomeIcon icon={faYoutube} className={clsx(classes.rightIcon, classes.red)} />
                          </Box>
                        </Hidden>
                      </Box>
                    </CardActionArea>
                  </>
                  :
                  <>
                    <CardMedia
                      className={classes.cardmedia}
                      image={agr.photo}
                      title={agr.agres}
                    />
                    <CardContent className={classes.lowerbottom}>
                      <Typography variant="h5" component="h2" >
                        {agr.agres} 
                      </Typography>
                    </CardContent>
                  </>
                )} 
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          maxWidth={false}
          fullScreen={isSmallScreen}
      >
        <DialogTitle id="responsive-dialog-title" className={classes.dialoguetitle}>
          {vidplay && (
            vidplay.titre_de_la_video ?
              <Typography>{vidplay.titre_de_la_video}</Typography>
            :
              <Typography>{vidplay.agres}</Typography>
          )}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.wrapper} >
          {vidplay && (
            isSmallScreen ?
            <YouTubePlayer url={vidplay.lien_youtube ? vidplay.lien_youtube : vidplay.video} width="100%" className={classes.player} controls />
            :
            <YouTubePlayer url={vidplay.lien_youtube ? vidplay.lien_youtube : vidplay.video} controls />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default connect(
    state => state,
    { setactivideo }
  )(CardGF)