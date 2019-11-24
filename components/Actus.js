// MUI
import Grid from '@material-ui/core/Grid';

// Composant
import ActuCard from "./cards/CardActu"

const Actus = props => (
  <>
    <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={2}>
      {props.listactus.map((actu) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={actu.id}>
          <ActuCard id={actu.id} slug={actu.slug} titre={actu.title} excerpt={actu.resume} img={actu.thumbnail ? actu.thumbnail : null} />
        </Grid>
      ))}
    </Grid>
  </>
);

export default Actus;