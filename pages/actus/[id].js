import Layout from '../../components/Layout.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { CURRENTACTU } from '../../redux/actionTypes';

//FCT
import fetch from 'isomorphic-unfetch';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

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
      paddingBottom: 0,
    }
  },
  textsize: {
    [theme.breakpoints.up('md')]: {
      fontSize: 22,
    }
  },
}));

function Actu({post}) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {title, article, article_pdf, image_de_fin, thumbnail} = post;

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
        <Hidden smUp>
          {thumbnail && <img src={thumbnail} alt={title} className={classes.media} />}
        </Hidden>
        <Grid item xs={12} sm={10}>
          <Typography 
            variant="body1"
            component="div" 
            className={classes.textsize}
            dangerouslySetInnerHTML={ {
              __html: article
          } } />
          {image_de_fin && (
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <img src={image_de_fin} alt={title} className={classes.media} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

Actu.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const res = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/posts/${id}`);
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