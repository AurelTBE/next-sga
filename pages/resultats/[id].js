import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//FCT
import fetch from 'isomorphic-unfetch';
import he from 'he';
import PDFview from '../../components/PDFview';

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


export default function Resultat(props) {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={10}>
          <Typography component="h2" variant="h2" gutterBottom>
            {he.decode(String(props.result.title))}
          </Typography>
          <Typography 
            variant="body1"
            component="div" 
            gutterBottom
            className={classes.content}
            dangerouslySetInnerHTML={ {
              __html: props.result.content
          } } />
          <p>{props.result.resultfile ? <PDFview pdf={props.result.resultfile} /> : null}</p>
        </Grid>
      </Grid>
    </Layout>
  )
}


Resultat.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/resultats/${id}`);
  const result = await res.json();

  return {
    result: result
  };
};