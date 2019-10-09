// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Composant
import CardBenevole from './cards/CardBenevole';

const useStyles = makeStyles(theme => ({
  buttonbar: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function Benevoles(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Boutons */}
      <Grid container direction="row" justify="center" alignItems="center" className={classes.buttonbar}>
        <ButtonGroup color="secondary" size={isSmallScreen ? "small" : "large"}>
          <Button href="#bureau">
            Bureau
          </Button>
          <Button href="#juges">
            Juges
          </Button>
          <Button href="#coachs">
            {isSmallScreen ? "Coachs" : "Entraineurs"}
          </Button>
          <Button href="#autres">
            {isSmallScreen ? "Autres" : "Autres bénévoles"}
          </Button>
        </ButtonGroup>
      </Grid>
      {/* Bureau */}
      <Box
        id="bureau"
        display="flex" 
        color="background.paper"
        bgcolor={theme.palette.secondary.main}
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        height={{xs: 60, md: 120}}
        width={1}
      >
        <Typography component="h3" variant={isSmallScreen ? "h4" : "h2"}>
          {isSmallScreen ? "Bureau" : "Bureau de la section Gym féminine"}
        </Typography>
      </Box>
      {props.benevoles.map(benevole => (
        benevole.infos.fonction.includes("Bureau") &&
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid>
      ))}
      {/* Juges */}
      <Box
        id="juges"
        display="flex" 
        color="background.paper"
        bgcolor={theme.palette.secondary.main}
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        height={{xs: 60, md: 120}}
        width={1}
      >
        <Typography component="h3" variant={isSmallScreen ? "h4" : "h2"}>
          Juges
        </Typography>
      </Box>
      {props.benevoles.map((benevole) => (
        benevole.infos.fonction.includes("Juge") ?
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid> :
        null
      ))}
      {/* Coachs */}
      <Box
        id="coachs"
        display="flex" 
        color="background.paper"
        bgcolor={theme.palette.secondary.main}
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        height={{xs: 60, md: 120}}
        width={1}
      >
        <Typography component="h3" variant={isSmallScreen ? "h4" : "h2"}>
          {isSmallScreen ? "Coachs" : "Entraineurs"}
        </Typography>
      </Box>
      {props.benevoles.map((benevole) => (
        benevole.infos.fonction.includes("Coach") ?
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid> :
        null
      ))}
      {/* Autres bénévoles */}
      <Box
        id="autres"
        display="flex" 
        color="background.paper"
        bgcolor={theme.palette.secondary.main}
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        height={{xs: 60, md: 120}}
        width={1}
      >
        <Typography component="h3" variant={isSmallScreen ? "h4" : "h2"}>
          {isSmallScreen ? "Autre" : "Autres bénévoles"}
        </Typography>
      </Box>
      {props.benevoles.map((benevole) => (
        !benevole.infos.fonction.includes("Bureau") && !benevole.infos.fonction.includes("Juge") && !benevole.infos.fonction.includes("Coach") && !benevole.infos.fonction.includes("Gymnaste")  ?
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid> :
        null
      ))}
    </Grid>
  </>
)}