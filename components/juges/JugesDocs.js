// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LivreCard from './LivreCard';
import NotationCard from './NotationCard';
import SiglesCard from './SiglesCard';

const useStyles = makeStyles(theme => ({
  buttonbar: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function JugesDocs({docs}) {
  const classes = useStyles();
  const theme = useTheme();
  const {livres, fiche_de_notation, fiche_de_sigles, power_point_de_formation} = docs;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Bouttons */}
      <Grid container direction="row" justify="center" alignItems="center" className={classes.buttonbar}>
        <ButtonGroup color="secondary" size={isSmallScreen ? "small" : "large"}>
          <Button href="#livres">
            Livres
          </Button>
          <Button href="#notation">
            {isSmallScreen ? "Notation" : "Fiches de notation"}
          </Button>
          <Button href="#sigles">
            {isSmallScreen ? "Sigles" : "Fiches de sigles"}
          </Button>
          <Button href="#powerpoint">
            {isSmallScreen ? "PowerPoint" : "PowerPoint de formation"}
          </Button>
        </ButtonGroup>
      </Grid>
      {/* Livres */}
      <Box
        id="livres"
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
      {livres.map(livre => (
        <Grid item xs={12} lg={5} key={livre.fichier}>
          <LivreCard livre={livre} />
        </Grid>
      ))}
      {/* Fiches de notation */}
      <Box
        id="notation"
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
      {fiche_de_notation.map(fiche => (
        <Grid item xs={12} lg={5} key={`not-${fiche.niveau}`}>
          <NotationCard fichenotation={fiche} />
        </Grid>
      ))}
      {/* Fiches de sigles */}
      <Box
        id="sigles"
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
      {fiche_de_sigles.map(fiche => (
        <Grid item xs={12} lg={5} key={`sigle-${fiche.niveau}`}>
          <SiglesCard fichesigle={fiche} />
        </Grid>
      ))}
      {/* PowerPoint de formation */}
      <Box
        id="powerpoint"
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
          {isSmallScreen ? "PowerPoint" : "PowerPoint de formation"}
        </Typography>
      </Box>
    </Grid>
  </>
)}