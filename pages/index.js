import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import fetch from 'isomorphic-unfetch';


const Index = props => (
  <Layout>
    <Tabs actus={props.actus} results={props.results} />
  </Layout>
);

Index.getInitialProps = async function() {
  const act = await fetch('http://sga-gymfeminine.fr/bo/wp-json/wp/v2/posts');
  const actus = await act.json();

  const res = await fetch('http://sga-gymfeminine.fr/bo/wp-json/wp/v2/resultats');
  const resultats = await res.json();

  return {
    actus: actus,
    results: resultats
  };

};

export default Index;