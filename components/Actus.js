// MUI
import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

// Composant
import CardContSkel from "./cards/CardContSkel"
import ActuCard from "./cards/CardActu"

const fetcher = url => fetch(url).then(r => r.json())

function Actus() {
  const { data, error } = useSWR('https://sga-gymfeminine.fr/bo/wp-json/sga/v1/listeposts', fetcher)
  const n = 12;
  if (error) return <div>Impossible de charger les actualités...</div>
  if (!data) return (
    <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={2}>
      {[...Array(n)].map((e, i) =>
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <CardContSkel />
        </Grid>      
      )}
    </Grid>
  )
  return (
    <>
      <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={2}>
        {data.map((actu) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={actu.id}>
            <ActuCard id={actu.id} slug={actu.slug} titre={actu.title} excerpt={actu.resume} img={actu.thumbnail ? actu.thumbnail : null} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Actus;