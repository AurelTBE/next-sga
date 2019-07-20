import Layout from '../../components/Layout.js';
import fetch from 'isomorphic-unfetch';
import { Document, Page } from 'react-pdf';

const Resultat = props => (
  <Layout>
    <h1>{props.result.title.rendered}</h1>
    <p>{props.result.content.rendered.replace(/<[/]?p>/g, '')}</p>
    <p>{props.result.acf.fichier_de_resultat_n1 ? props.result.acf.fichier_de_resultat_n1 : null}</p>
    {/*<Document file={props.result.acf.fichier_de_resultat_n1} >
      <Page pageNumber={1} />
    </Document>*/}
  </Layout>
);

Resultat.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/wp/v2/resultats?slug=${id}`);
  const result = await res.json();

  console.log(result[0]);

  return {
    result: result[0]
  };
};

export default Resultat;