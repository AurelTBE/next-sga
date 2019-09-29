import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { CURRENTRESULT } from '../../redux/actionTypes';

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


function Resultat({result}) {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={10}>
          <Typography component="h2" variant="h2" gutterBottom>
            {result.title}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Date de la compétition : {result.date}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Lieu de la compétition : {result.ville}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Groupes ayant participé : {result.groupe}
          </Typography>
          <p>{result.resultfile ? <PDFview pdf={result.resultfile} /> : null}</p>
          {console.log(result)}
        </Grid>
      </Grid>
    </Layout>
  )
}


Resultat.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/resultats/${id}`);
  const result = await res.json();
  ctx.store.dispatch({ type: CURRENTRESULT, payload: result });
  return {};
};

const mapStateToProps = state => ({ 
  result: state.currentresult,
 });

export default connect(
  mapStateToProps,
)(Resultat);