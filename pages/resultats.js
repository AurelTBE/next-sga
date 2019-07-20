import Layout from '../components/Layout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Résultats</h1>
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>
          <Link href="/resultats/[id]" as={`/resultats/${post.slug}`}>
            <a>{post.title.rendered}</a>
          </Link>
        </li>
      ))}
    </ul>
    {console.log(props.posts)}
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://sga-gymfeminine.fr/bo/wp-json/wp/v2/resultats');
  const data = await res.json();

  return {
    posts: data
  };

};

export default Index;