// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Composant
import CardEntrainement from './cards/CardEntrainement';


export default function Entrainements(props) {
  const theme = useTheme();

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {props.entrainements.map((entrainement) => (
        <Grid item xs={12} sm={6} md={12} key={entrainement.id}>
          <CardEntrainement entrainement={entrainement} />
        </Grid> 
      ))}
    </Grid>
  </>
)}