// MUI
import Grid from '@material-ui/core/Grid';

// Composant
import CardBenevole from '../components/CardBenevole';

const Benevoles = props => (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {props.benevoles.map((benevole) => (
        <Grid item xs={12} lg={5} key={benevole.id}>
          <CardBenevole benevole={benevole} />
        </Grid>
      ))}
    </Grid>
  </>
);

export default Benevoles;