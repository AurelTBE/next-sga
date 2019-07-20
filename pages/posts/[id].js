import Layout from '../../components/Layout.js';
import fetch from 'isomorphic-unfetch';

const Post = props => (
  <Layout>
    <h1>{props.post.title.rendered}</h1>
    <p>{props.post.content.rendered.replace(/<[/]?p>/g, '')}</p>
    {/*<img src={props.post.image.medium} />*/}
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