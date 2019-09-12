// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Composant
import CardBenevole from '../components/CardBenevole';


export default function Benevoles(props) {
  const theme = useTheme();

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
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
          Bureau de la section Gym féminine :
      </Typography></Box></Grid>
      {props.benevoles.map((benevole) => (
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid>
      ))}
    </Grid>
  </>
)}