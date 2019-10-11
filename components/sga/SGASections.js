// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardGF from '../cards/CardGF';
import CardSections from '../cards/CardSections';

export default function SGASections({sections}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {autres_sections} = sections

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Gym féminine */}
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
          {sections.gymfem.categorie}
        </Typography>
      </Box>
      <Grid item xs={12} sm={6} md={12}>
        <CardGF gymfem={sections.gymfem} />
      </Grid>
      {/* Autres sections */}
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
          {sections.autres_sections.categorie}
        </Typography>
      </Box>        
        {autres_sections.sections.map(section => (
          <Grid item xs={12} sm={6} md={12} key={section.section}>
            <CardSections autresection={section} />
          </Grid>
        ))}
    </Grid>
  </>
)}