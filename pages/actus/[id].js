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
      {props.post.bigbanner ? <img src={props.post.bigbanner} alt={he.decode(String(props.post.title))} className={classes.media} /> : null}
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={10}>
          <Typography component="h2" variant="h2" gutterBottom>
            {he.decode(String(props.post.title))}
          </Typography>
          <Typography 
            variant="body1"
            component="div" 
            gutterBottom
            className={classes.content}
            dangerouslySetInnerHTML={ {
              __html: props.post.content
          } } />
        {/*<img src={props.post.image.medium} />*/}
        </Grid>
      </Grid>
    </Layout>
  )
}

Actu.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/posts/${id}`);
  const post = await res.json();

  return {
    post: post
  };
};