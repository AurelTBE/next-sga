import dynamic from 'next/dynamic'

// Comps
import Layout from '../components/Layout';
const Tabs = dynamic(
  () => import('../components/Tabs'),
  { loading: () => <p>Chargement...</p> }
)

const Index = () => (
  <Layout>
    <Tabs />
  </Layout>
);

export default Index