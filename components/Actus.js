// MUI
import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

// Composant
import ActuCard from "./cards/CardActu"

const fetcher = url => fetch(url).then(r => r.json())

const Actus = props => {
  const { data, error } = useSWR('https://sga-gymfeminine.fr/bo/wp-json/sga/v1/listeposts', fetcher)
  
  if (error) return <div>Impossible de charger les actualités...</div>
  if (!data) return <div>Chargement des actualités...</div>
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