import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';

// MUI
import Grid from '@material-ui/core/Grid';

// Composant
import ResultCard from "./cards/CardResult"

const fetcher = url => fetch(url).then(r => r.json())

const Resultats = props => {
  const { data, error } = useSWR('https://sga-gymfeminine.fr/bo/wp-json/sga/v1/listresults', fetcher)
  if (error) return <div>Impossible de charger les résultats...</div>
  if (!data) return <div>Chargement des résultats...</div>
  return (
    <>
      <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={2}>
        {data.map((resultat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={resultat.id}>
            <ResultCard id={resultat.id} slug={resultat.slug} titre={resultat.title} img={resultat.couverture ? resultat.couverture : null} />
          </Grid>
        ))}
      </Grid>
    </>
  )
};

export default Resultats;