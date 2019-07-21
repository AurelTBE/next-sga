import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import ErrorMessage from '../../components/ErrorMessage';
import fetch from 'isomorphic-unfetch';
import he from 'he'


const Post = props => (
  <Layout>
    <Grid container spacing={24}>
      <Grid item xs={12}>
      <h1>{props.post.title.rendered}</h1>
      <p>{props.post.content.rendered.replace(/<[/]?p>/g, '')}</p>
      {/*<img src={props.post.image.medium} />*/}
      </Grid>
    </Grid>
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/wp/v2/posts?slug=${id}`);
  const post = await res.json();

  console.log(post[0]);

  return {
    post: post[0]
  };
};

export default Post;