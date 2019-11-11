import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
}));

export default function FabIntegrationSnackbar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsOpen(true)
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  function askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
      setIsOpen(false)
    });
  }

  return (
    <>
        <Snackbar
            open={isOpen}
            autoHideDuration={4000}
            ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            }}
            message={<span id="snackbar-fab-message-id">Voulez-vous recevoir des notifications pour être au courant des résultats et actualités ?</span>}
            action={
                <>
                    <Button color="inherit" size="small" onClick={() => askPermission()}>
                        OK
                    </Button>
                    <Button color="inherit" size="small" onClick={() => setIsOpen(false)}>
                        Plus tard
                    </Button>
                </>
            }
            className={classes.snackbar}
        />
    </>
  );
}