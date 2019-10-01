import Link from 'next/link';

// MUI
import Grid from '@material-ui/core/Grid';

// Composant
import ResultCard from "./cards/CardResult"

const Resultats = props => (
  <>
    <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={2}>
      {props.listresults.map((resultat) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={resultat.id}>
          <ResultCard id={resultat.id} slug={resultat.slug} titre={resultat.title} img={resultat.couverture ? resultat.couverture : null} />
        </Grid>
      ))}
    </Grid>
  </>
);

export default Resultats;