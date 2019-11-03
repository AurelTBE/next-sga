import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faYahoo, faApple } from '@fortawesome/free-brands-svg-icons'
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { Outlook } from 'mdi-material-ui'

const useStyles = makeStyles(theme => ({
  calicons: {
    fontSize: 16,
  },
  outlookcalicon: {
    fontSize: 17,
  },
}));


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function AddToCal() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Ajouter au calendrier
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGoogle} />
          </ListItemIcon>
          <ListItemText primary="Google" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faApple} />
          </ListItemIcon>
          <ListItemText primary="Apple Calendar" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <Outlook className={classes.outlookcalicon} />
          </ListItemIcon>
          <ListItemText primary="Outlook" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faYahoo} />
          </ListItemIcon>
          <ListItemText primary="Yahoo" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCalendarPlus} />
          </ListItemIcon>
          <ListItemText primary="Autres calendriers" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}