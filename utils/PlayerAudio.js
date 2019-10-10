import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Player
import AudioPlayer from 'material-ui-audio-player';
 
const useStyles = makeStyles(theme => {
  return {
    paper: {
        padding: theme.spacing(2),
      },
    title: {
        margin: theme.spacing(1),
        textAlign: "center",
        paddingBottom: theme.spacing(2),
    },
    music: {
        color: theme.palette.primary.main,
    },
    nomusic: {
        color: "#bdbdbd",
    },
  };
});
 

export default function PlayerAudio({music}) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Paper className={classes.paper}>
            <Grid item className={classes.title}>
                <Box border={2} borderColor={music.musique ? "primary.main" : "#bdbdbd"} p={{ xs: 2 }}>
                    <Typography variant={isSmallScreen ? "h6" : "h5"} component="h3" className={music.musique ? classes.music : classes.nomusic}>
                        {music.titre}
                    </Typography>
                </Box>
            </Grid>
            <AudioPlayer
                elevation={0}
                variation={music.musique ? "primary" : "default"}
                download={true}
                loop={true}
                spacing={2}
                src={music.musique}
            />
        </Paper>
    )
}
