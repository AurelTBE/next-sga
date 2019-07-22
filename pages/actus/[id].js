import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//FCT
import fetch from 'isomorphic-unfetch';
import he from 'he';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  media: {
    maxWidth: "100%",
  },
  content: {
    textAlign: 'left',
    '& figure': {
      textAlign: 'center',
    },
  }
}));

export default function Actu(props) {
  const classes = useStyles();

  return (
    <Layout>
      <img src={props.post.featured_img ? props.post.featured_img : "/static/LOGO-CERTIFICATION.jpg"} alt={he.decode(String(props.post.title))} className={classes.media} />
      <Grid container justify="center" spacing={2} className={classes.root}>
        <Grid item xs={10}>
          <Typography component="h2" variant="h2" gutterBottom>
            {he.decode(String(props.post.title.rendered))}
          </Typography>
          <Typography 
            variant="body1"
            component="div" 
            gutterBottom
            className={classes.content}
            dangerouslySetInnerHTML={ {
              __html: props.post.content.rendered
          } } />
        {/*<img src={props.post.image.medium} />*/}
        </Grid>
      </Grid>
    </Layout>
  )
}

Actu.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/wp/v2/posts?slug=${id}`);
  const post = await res.json();

  return {
    post: post[0]
  };
};