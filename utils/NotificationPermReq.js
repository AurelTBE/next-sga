import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { askForPermissioToReceiveNotifications } from '../utils/push-notifications';

// Redux
import { connect } from 'react-redux';
import { setnotifperm } from '../redux/actions/navActions';

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

function NotificationPermReq({setnotifperm, notifperm}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notifperm) {
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 6000);
        return () => clearTimeout(timer)
    }
  }, []);

  function askPermission() {
    askForPermissioToReceiveNotifications()
    setnotifperm(false)
    setIsOpen(false)
  }

  function handleClose() {
    setnotifperm(false)
    setIsOpen(false)
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
                    <Button color="inherit" size="small" onClick={askPermission}>
                        OK
                    </Button>
                    <Button color="inherit" size="small" onClick={handleClose}>
                        Plus tard
                    </Button>
                </>
            }
            className={classes.snackbar}
        />
    </>
  );
}

const mapStateToProps = state => ({ notifperm: state.notifperm });

export default connect(
  mapStateToProps,
  { setnotifperm }
)(NotificationPermReq)