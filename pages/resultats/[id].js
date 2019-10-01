import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import { CURRENTRESULT } from '../../redux/actionTypes';

//FCT
import fetch from 'isomorphic-unfetch';
import he from 'he';
import PDFview from '../../utils/PDFview';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  media: {
    maxWidth: "100%",
  },
  image: {
    width: "100%",
  },
  pdf: {
    width: "100%",
    maxWidth: "100%",
  },
  
}));

// File extension
function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

function Resultat({result}) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Layout>
      <Box p={1}>
        <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
          {/* Livres */}
          <Box
            display="flex" 
            color="background.paper"
            bgcolor={theme.palette.secondary.main}
            fontFamily="h6.fontFamily"
            fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
            p={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            alignItems="center"
            height={{xs: 90, md: 120}}
            width={1}
          >
            <Typography component="h3" variant={isSmallScreen ? "h4" : "h2"} align="center">
              {result.title}
            </Typography>
          </Box>
          <Grid item xs={10}>
            <Typography component="div" variant="body2" gutterBottom>
              Date de la compétition : {result.date}
            </Typography>
            <Typography component="div" variant="body2" gutterBottom>
              Lieu de la compétition : {result.ville}
            </Typography>
            <Typography component="div" variant="body2" gutterBottom>
              Groupes ayant participé : {result.groupe}
            </Typography>
            {/* Equipes */}
            <>{result.equipes && (result.equipes.map(equipe => (
                <div key={result.date + equipe.nom_de_lequipe}>
                  <Typography component="div" variant="h4" align="center" gutterBottom>{equipe.nom_de_lequipe}</Typography>
                  {equipe.palmares && 
                    <>
                      <Typography component="div" variant="h5" align="center" gutterBottom>
                        Palmarès
                      </Typography>
                      <PDFview pdf={equipe.palmares} />
                    </>
                  }
                  {equipe.tableau_de_resultats_des_gyms && 
                    <>
                      <Typography component="div" variant="h5" align="center" gutterBottom>
                        Tableau de résultat des gyms
                      </Typography>
                      {getFileExtension(equipe.tableau_de_resultats_des_gyms) == "pdf" ? 
                        <Box className={classes.pdf}>
                          <PDFview pdf={equipe.tableau_de_resultats_des_gyms} />
                        </Box>
                        :
                        <img src={equipe.tableau_de_resultats_des_gyms} alt={`Tableau de résultat des gyms`} className={classes.image} />
                      }
                    </>
                  }
                </div>
              )
            ))}</>
            {/* Catégories */}
            <>{result.categories && (result.categories.categories.map(categorie => (
                <div key={result.date + categorie.nom_de_la_categorie}>
                  <Typography component="div" variant="h4" align="center" gutterBottom>{categorie.nom_de_la_categorie}</Typography>
                  {categorie.palmares_de_la_categorie && 
                    <>
                      <Typography component="div" variant="h5" align="center" gutterBottom>
                        Palmarès de la catégorie
                      </Typography>
                      {getFileExtension(categorie.palmares_de_la_categorie) == "pdf" ? 
                        <Box className={classes.pdf}>
                          <PDFview pdf={categorie.palmares_de_la_categorie} />
                        </Box>
                        :
                        <img src={categorie.palmares_de_la_categorie} alt={`Palmarès de la catégorie ${categorie.nom_de_la_categorie}`} className={classes.image} />
                      }
                    </>
                  }
                </div>
              )
            ))}</>
            {/* Tableau de résultat des gyms */}
            <>{result.tableau_des_resultats_des_gyms && (
              <>
                <Typography component="div" variant="h5" align="center" gutterBottom>
                  Tableau de résultat des gyms
                </Typography>
                {getFileExtension(result.tableau_des_resultats_des_gyms) == "pdf" ? 
                  <Box className={classes.pdf}>
                    <PDFview pdf={result.tableau_des_resultats_des_gyms} />
                  </Box>
                  :
                  <img src={result.tableau_des_resultats_des_gyms} alt={`Tableau de résultat des gyms`} className={classes.image} />
                }
              </>
            )}</>
            {console.log(result)}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

// .palmares && <PDFview pdf={result.equipes.palmares} />

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