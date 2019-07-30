import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import fetch from 'isomorphic-unfetch';


const Index = props => (
  <Layout>
    <Tabs actus={props.actus} results={props.results} events={props.events} allevents={props.allevents} />
  </Layout>
);

Index.getInitialProps = async function() {
  const path = "http://sga-gymfeminine.fr/bo/wp-json"

  const act = await fetch(`${path}/wp/v2/posts`);
  const actus = await act.json();

  const res = await fetch(`${path}/wp/v2/resultats`);
  const resultats = await res.json();

  const eve = await fetch(`${path}/tribe/events/v1/events`);
  const events = await eve.json();

  const alleve = await fetch(`${path}/tribe/events/v1/events?start_date=2018-06-01&end_date=2030-07-01`);
  const allevents = await alleve.json();

  return {
    actus: actus,
    results: resultats,
    events: events.events,
    allevents: allevents.events,
  };

};

export default Index;