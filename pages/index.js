import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import fetch from 'isomorphic-unfetch';

// Redux
import { connect } from 'react-redux';
import { HOMECONTENT } from '../redux/actionTypes'

const Index = ({homeContent}) => (
  <Layout>
    <Tabs actus={homeContent.actus} results={homeContent.results} events={homeContent.events} mediafolders={homeContent.mediafolders} />
  </Layout>
);

const mapStateToProps = state => ({ homeContent: state.homecontent });

Index.getInitialProps = async function(ctx) {
  const path = "http://sga-gymfeminine.fr/bo/wp-json"

  const act = await fetch(`${path}/sga/v1/listeposts`);
  const actus = await act.json();

  const publicmedia = await fetch(`${path}/sga/v1/mediatheque`);
  const publicmediafolders = await publicmedia.json();

  const eve = await fetch(`${path}/sga/v1/evenements`);
  const events = await eve.json();

  const res = await fetch(`${path}/sga/v1/listresults`);
  const resultats = await res.json();

  const homedata = {
    actus: actus,
    results: resultats,
    events: events,
    mediafolders: publicmediafolders,
  }

  ctx.store.dispatch({ type: HOMECONTENT, payload: homedata });

  return {
    actus: actus,
    results: resultats,
    events: events,
    mediafolders: publicmediafolders,
  };

};

export default connect(
  mapStateToProps,
)(Index);