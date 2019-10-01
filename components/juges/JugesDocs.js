// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function JugesDocs({docs}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Livres */}
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
          Livres
        </Typography>
      </Box>
      {/* Fiches de notation */}
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
          Fiches de notation
        </Typography>
      </Box>
      {/* Fiches de sigles */}
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
          Fiches de sigles
        </Typography>
      </Box>
      {/* PowerPoint de formation */}
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
          PowerPoint de formation
        </Typography>
      </Box>
      {console.log(docs)}
    </Grid>
  </>
)}