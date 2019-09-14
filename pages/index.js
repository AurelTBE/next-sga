import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import fetch from 'isomorphic-unfetch';


const handleSubmit = (props, e) => {
  e.preventDefault();
  props.getPosts();
};

const Index = props => (
  <Layout>
    <Tabs actus={props.actus} results={props.results} events={props.events} mediafolders={props.mediafolders} />
  </Layout>
);

Index.getInitialProps = async function() {
  const path = "http://sga-gymfeminine.fr/bo/wp-json"

  const act = await fetch(`${path}/sga/v1/listeposts`);
  const actus = await act.json();

  const publicmedia = await fetch(`${path}/sga/v1/mediatheque`);
  const publicmediafolders = await publicmedia.json();

  const eve = await fetch(`${path}/sga/v1/evenements`);
  const events = await eve.json();

  const res = await fetch(`${path}/sga/v1/listresults`);
  const resultats = await res.json();

  return {
    actus: actus,
    results: resultats,
    events: events,
    mediafolders: publicmediafolders,
  };

};

export default Index;