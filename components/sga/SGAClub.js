// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comp
import CardClub from '../cards/CardClub';
import CardFSCF from '../cards/CardFSCF';

export default function SGAClub({club}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Le club */}
      <Box
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
          {club.le_club.categorie}
        </Typography>
      </Box>
      <Grid item xs={12} sm={6} md={12}>
        <CardClub sga={club.le_club} />
      </Grid>
      {/* La FSCF */}
      <Box
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
        <Typography variant={isSmallScreen ? "h4" : "h2"}>
          {club.fscf.categorie}
        </Typography>
      </Box>
      <Grid item xs={12} sm={6} md={12}>
        <CardFSCF fscf={club.fscf} />
      </Grid>
    </Grid>
  </>
)}