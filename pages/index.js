import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import fetch from 'isomorphic-unfetch';


const Index = props => (
  <Layout>
    <Tabs actus={props.actus} results={props.results} events={props.events} />
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

  return {
    actus: actus,
    results: resultats,
    events: events.events,
  };

};

export default Index;