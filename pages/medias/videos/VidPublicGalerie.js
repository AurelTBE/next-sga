import { makeStyles, useTheme } from '@material-ui/core/styles';
// MUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

// Modal
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Masonry
import Masonry from 'react-masonry-css';

// Redux
import { connect } from 'react-redux';
import { setactivideo } from '../../../redux/actions/contActions'

// Layout
import Layout from '../../../components/Layout.js';

// Player
import YouTubePlayer from 'react-player/lib/players/YouTube';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: "100%",
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  masonryGrid: {
    display: 'flex',
    marginLeft: 0,
    width: "100%",
  },
  masonryColumn: {
    paddinLeft: 0,
  },
  image: {
    position: "relative",
    width: "100%",
  },
  caption: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: theme.palette.background.paper,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
  },
  icon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: theme.palette.background.paper,
    fontSize: 60,
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

function VidPublicGalerie({vids, galeriecontent, setactivideo, vidplay}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  function handleClickOpen(vid) {
    setactivideo(vid)
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Layout>
      <Box
        display="flex" 
        color="background.paper"
        bgcolor={theme.palette.secondary.main}
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        height={{xs: 60, md: 90}}
        width={1}
      >
        <Typography component="h2" variant={isSmallScreen ? "h6" : "h4"}>
          {galeriecontent.galerie.title}
        </Typography>
      </Box>
      <div className={classes.root}>
        <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn}>
          {vids.map((vid) => (
            <ButtonBase key={vid.lien_youtube} onClick={() => handleClickOpen(vid)}>
              <img src={vid.thumbnail} alt={vid.titre} className={classes.image} />
              <PlayCircleOutlineIcon className={classes.icon} />
              <Box className={classes.caption} width={1}><Typography variant="h5">{vid.titre}</Typography></Box>
            </ButtonBase> 
          ))}
        </Masonry>
      </div>      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth={false}
        fullScreen={isSmallScreen}
      >
        <DialogTitle id="responsive-dialog-title" className={classes.dialoguetitle}>
          {vidplay && <Typography>{vidplay.titre}</Typography>}
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
    </Layout>
)}

export default connect(
  state => state,
  { setactivideo }
)(VidPublicGalerie); 