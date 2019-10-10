// MUI
import Grid from '@material-ui/core/Grid';

// Composant
import CardEntrainement from './cards/CardEntrainement';

export default function Entrainements(props) {

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