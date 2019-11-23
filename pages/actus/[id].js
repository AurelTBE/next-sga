import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

// Redux
import { connect } from 'react-redux';
import { CURRENTACTU } from '../../redux/actionTypes';

//FCT
import PDFview from '../../utils/PDFview';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  media: {
    paddingTop: 20,
    maxWidth: "100%",
  },
  title: {
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 10,
    }
  },
  textsize: {
    [theme.breakpoints.up('md')]: {
      fontSize: 22,
    }
  },
  pdf: {
    width: "100%",
    maxWidth: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Actu({post}) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {title, article, image_de_fin, thumbnail, liens} = post;

  return (
    <Layout>
      <Grid container justify="center" className={classes.root}>
        <Grid container justify="center" className={classes.title}>
          <Box border={2} borderColor="primary.main" p={{ xs: 2 }}>
            <Typography component="h2" variant={isSmallScreen ? "h4" : "h2"} color="primary">
              {title}
            </Typography>
          </Box>
        </Grid>
        {article.pdf ? 
          <Box className={classes.pdf}>
            <PDFview pdf={article.pdf} />
          </Box>
        :
          <>
            <Grid item xs={12} sm={10}>
              <Hidden smUp>
                <Grid container justify="center">
                  <Grid item xs={12} sm={10}>
                    {thumbnail && <img src={thumbnail} alt={title} className={classes.media} />}
                  </Grid>
                </Grid>
              </Hidden>
              <Typography 
                variant="body1"
                component="div" 
                className={classes.textsize}
                dangerouslySetInnerHTML={ {
                  __html: article.text
              } } />
              {image_de_fin && (
                <Grid container justify="center">
                  <Grid item xs={12} sm={10} md={8} lg={6}>
                    <img src={image_de_fin} alt={title} className={classes.media} />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </>
        }
      </Grid>
      <Grid container justify="center">
        {liens && (
            liens.map(lien => 
              (lien.type === 'Galerie Photo' || lien.type === 'Galerie Vidéo' || lien.type === 'Galerie Musique') ?
                (<Link href="/medias/[id]" as={`/medias/${lien.lien}`} key={lien.type+Math.random()}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    {lien.type}
                  </Button>
                </Link>)
              :(lien.type === 'Résultat') ?
                (<Link href="/resultats/[id]" as={`/resultats/${lien.lien}`} key={lien.type+Math.random()}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    {lien.type}
                  </Button>
                </Link>)
              :(lien.type === 'Page du site') ?
                (<Link href="/" as={`/`} key={lien.type+Math.random()}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    {lien.lien.nom}
                  </Button>
                </Link>)
              :(lien.type === 'Site externe') ?
                (<Button variant="contained" color="primary" className={classes.button} component="a" aria-label="Facebook" href={lien.lien.url} target="_blank" rel="noopener" key={lien.type+Math.random()}>
                  {lien.lien.nom}
                </Button>)
              : null
            )
          )}
        </Grid>
    </Layout>
  )
}

Actu.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const res = await fetch(`https://sga-gymfeminine.fr/bo/wp-json/sga/v1/posts/${id}`);
  const post = await res.json();
  ctx.store.dispatch({ type: CURRENTACTU, payload: post });
  return {};
};

const mapStateToProps = state => ({ 
  post: state.currentactu,
 });

export default connect(
  mapStateToProps,
)(Actu);