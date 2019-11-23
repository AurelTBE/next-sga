import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPaperclip, faTrophy, faMedal, faStar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { connect } from 'react-redux';
import { CURRENTRESULT } from '../../redux/actionTypes';

//FCT
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
  meta: {
    fontSize: 20,
  },
  metasmall: {
    fontSize: 15,
  },
  resume: {
    paddingBottom: 50,
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 20,
      paddingTop: 10,
    },
  },
  resumetext: {
    fontSize: 34,
    paddingLeft: 15,
  },
  smallresumetext: {
    fontSize: 24,
  },
  resumeicon: {
    fontSize: 30,
  },
  smallresumeicon: {
    fontSize: 22,
  },
  resumeiconcol: {
    color: theme.palette.secondary.main,
  },
  resumecontent: {
    paddingLeft: 40,
  },
  smallresumecontent: {
    paddingLeft: 10,
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
          {/* Résultats */}
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
            <Typography component="div" align="center" color="primary" className={isSmallScreen ? classes.metasmall : classes.meta} gutterBottom>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {result.ville}  -  <FontAwesomeIcon icon={faCalendarCheck} /> {result.date}
            </Typography>
            {/* Résumé */}
            {result.resume &&
              <Grid item sm={12} className={classes.resume}> 
                <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
                  <Typography component="div" variant="h4" color="primary" className={isSmallScreen ? classes.smallresumetext : classes.resumetext} gutterBottom><FontAwesomeIcon icon={faPaperclip} className={isSmallScreen ? classes.smallresumeicon : classes.resumeicon} /> Résumé</Typography>
                  {result.resume.resume_equipe && (result.resume.resume_equipe.map(equipe => (
                    <div key={equipe.type_de_palmares} className={isSmallScreen ? classes.smallresumecontent : classes.resumecontent} >
                      <Typography component="div" variant="body2" className={isSmallScreen ? classes.metasmall : classes.meta} gutterBottom><FontAwesomeIcon icon={faTrophy} className={classes.resumeiconcol} /> {equipe.type_de_palmares} : {equipe.classement}</Typography>
                    </div>
                  )))}
                  {result.resume.resume_indiv && (result.resume.resume_indiv.equipe && (result.resume.resume_indiv.equipe.map(resume => (
                    resume.categorie && (<div key={resume.categorie + resume.classement} className={isSmallScreen ? classes.smallresumecontent : classes.resumecontent} >
                      <Typography component="div" variant="body2" className={isSmallScreen ? classes.metasmall : classes.meta} gutterBottom><FontAwesomeIcon icon={faTrophy} className={classes.resumeiconcol} /> {resume.categorie} : {resume.classement}</Typography>
                    </div>)
                  ))))}
                  {result.resume.resume_indiv && (result.resume.resume_indiv.individuelles && (result.resume.resume_indiv.individuelles.map(indiv => (
                    <div key={indiv.categorie + indiv.classement} className={isSmallScreen ? classes.smallresumecontent : classes.resumecontent} >
                      <Typography component="div" variant="body2" className={isSmallScreen ? classes.metasmall : classes.meta} gutterBottom><FontAwesomeIcon icon={faMedal} className={classes.resumeiconcol} /> {indiv.categorie} : {indiv.classement.map((gym, index) => <> {gym.prenom_de_la_gym}{gym.place && ` (${gym.place})`}{index < indiv.classement.length - 1 ? ',' : ''}</>)}</Typography>
                    </div>
                  ))))}
                  {result.resume.resume_etoiles_3d && (result.resume.resume_etoiles_3d.map(etoile => (
                    <div key={etoile.etoile_validee} className={isSmallScreen ? classes.smallresumecontent : classes.resumecontent} >
                      <Typography component="div" variant="body2" className={isSmallScreen ? classes.metasmall : classes.meta} gutterBottom><FontAwesomeIcon icon={faStar} className={classes.resumeiconcol} /> {etoile.etoile_validee} : {etoile.prenom_des_gyms.map((gym, index) => <> {gym.prenom}{index < etoile.prenom_des_gyms.length - 1 ? ',' : ''}</>)}</Typography>
                    </div>
                  )))}
                </Box>
              </Grid>}
            {/* Equipes */}
            <>
              {result.equipes && (result.equipes.map(equipe => (
                <div key={result.date + equipe.nom_de_lequipe}>
                  {equipe.palmares && 
                    <>
                      <Box
                        display="flex" 
                        color={theme.palette.secondary.main}
                        border={2} 
                        borderColor={theme.palette.secondary.main}
                        fontFamily="h6.fontFamily"
                        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
                        p={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                        height={{xs: 70, md: 90}}
                        width={1}
                      >
                        <Typography component="h3" variant={isSmallScreen ? "h6" : "h4"} align="center">
                          {equipe.nom_de_lequipe} - Palmarès
                        </Typography>
                      </Box>
                      {getFileExtension(equipe.palmares) == "pdf" ? 
                        <Box className={classes.pdf}>
                          <PDFview pdf={equipe.palmares} />
                        </Box>
                        :
                        <img src={equipe.palmares} alt={`${equipe.nom_de_lequipe} - palmarès`} className={classes.image} />
                      }
                    </>
                  }
                  {equipe.tableau_de_resultats_des_gyms && 
                    <>
                      <Box
                        display="flex" 
                        color={theme.palette.secondary.main}
                        border={2} 
                        borderColor={theme.palette.secondary.main}
                        fontFamily="h6.fontFamily"
                        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
                        p={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                        height={{xs: 70, md: 90}}
                        width={1}
                      >
                        <Typography component="h3" variant={isSmallScreen ? "h6" : "h4"} align="center">
                          {equipe.nom_de_lequipe} - Résultats des gyms
                        </Typography>
                      </Box>
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
              )))}
            </>
            {/* Catégories */}
            <>
              {result.categories && (result.categories.categories.map(categorie => (
                <div key={result.date + categorie.nom_de_la_categorie}>
                  {categorie.palmares_de_la_categorie && 
                    <>
                      <Box
                        display="flex" 
                        color={theme.palette.secondary.main}
                        border={2} 
                        borderColor={theme.palette.secondary.main}
                        fontFamily="h6.fontFamily"
                        fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
                        p={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                        height={{xs: 70, md: 90}}
                        width={1}
                      >
                        <Typography component="h3" variant={isSmallScreen ? "h6" : "h4"} align="center">
                          Palmarès {categorie.nom_de_la_categorie}
                        </Typography>
                      </Box>
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
              )))}
            </>
            {/* Tableau de résultat des gyms */}
            <>
              {result.tableau_des_resultats_des_gyms && (
                <>
                  <Box
                    display="flex" 
                    color={theme.palette.secondary.main}
                    border={2} 
                    borderColor={theme.palette.secondary.main}
                    fontFamily="h6.fontFamily"
                    fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
                    p={{ xs: 2, sm: 3, md: 4 }}
                    justifyContent="center"
                    alignItems="center"
                    height={{xs: 70, md: 90}}
                    width={1}
                  >
                    <Typography component="h3" variant={isSmallScreen ? "h6" : "h4"} align="center">
                      Résultats des gyms
                    </Typography>
                  </Box>
                  {getFileExtension(result.tableau_des_resultats_des_gyms) == "pdf" ? 
                    <Box className={classes.pdf}>
                      <PDFview pdf={result.tableau_des_resultats_des_gyms} />
                    </Box>
                    :
                    <img src={result.tableau_des_resultats_des_gyms} alt={`Tableau de résultat des gyms`} className={classes.image} />
                  }
                </>
              )}
            </>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              {result.thumbnail && <img src={result.thumbnail} alt={result.title} className={classes.media} />}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

Resultat.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const res = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/resultats/${id}`);
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