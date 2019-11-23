import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "100%",
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function Blabla() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <Typography component="h2" variant="h3" gutterBottom>
        Connexion
      </Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <form className={classes.container} noValidate autoComplete="off">
          <Grid item xs={12}>
            <TextField
              id="connexion-name"
              label="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="connexion-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
          </Grid>
          <Button variant="contained" color="primary" className={classes.button}>
            Connexion
          </Button>         
        </form>
      </Grid>    
    </>
  )
}