import Link from 'next/link';

// MUI
import Grid from '@material-ui/core/Grid';

// Composant
import ResultCard from "./CardResult"

const Resultats = props => (
  <>
    <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={2}>
      {props.listresults.map((resultat) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={resultat.id}>
          <ResultCard id={resultat.id} slug={resultat.slug} titre={resultat.title} excerpt={resultat.excerpt ? resultat.excerpt : "Pas de résumé"} img={resultat.thumbnail ? resultat.thumbnail : null} />
        </Grid>
      ))}
    </Grid>
  </>
);

export default Resultats;