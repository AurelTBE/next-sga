// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Composant
import CardBenevole from '../components/CardBenevole';


export default function Benevoles(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Bureau */}
      <Grid item xs={12} sm={10}>
        <Box
          display="flex" 
          bgcolor={theme.palette.primary.light}
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
          height={{xs: 100, md: 120}}
        >
          <Typography component="h2" variant="h2" gutterBottom>
            {isSmallScreen ? "Bureau" : "Bureau de la section Gym féminine"}
          </Typography>
        </Box>
      </Grid>
      {props.benevoles.map((benevole) => (
        benevole.infos.fonction.includes("Bureau") ?
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid> :
        null
      ))}
      {/* Juges */}
      <Grid item xs={12} sm={10}>
        <Box
          display="flex" 
          bgcolor={theme.palette.primary.light}
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
          height={{xs: 100, md: 120}}
        >
          <Typography component="h2" variant="h2" gutterBottom>
            Juges
          </Typography>
        </Box>
      </Grid>
      {props.benevoles.map((benevole) => (
        benevole.infos.fonction.includes("Juge") ?
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid> :
        null
      ))}
      {/* Coachs */}
      <Grid item xs={12} sm={10}>
        <Box
          display="flex" 
          bgcolor={theme.palette.primary.light}
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
          height={{xs: 100, md: 120}}
        >
          <Typography component="h2" variant="h2" gutterBottom>
            {isSmallScreen ? "Coachs" : "Entraineurs"}
          </Typography>
        </Box>
      </Grid>
      {props.benevoles.map((benevole) => (
        benevole.infos.fonction.includes("Coach") ?
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid> :
        null
      ))}
      {/* Autres bénévoles */}
      <Grid item xs={12} sm={10}>
        <Box
          display="flex" 
          bgcolor={theme.palette.primary.light}
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
          height={{xs: 100, md: 120}}
        >
          <Typography component="h2" variant="h2" gutterBottom>
            {isSmallScreen ? "Autre" : "Autres bénévoles"}
          </Typography>
        </Box>
      </Grid>
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