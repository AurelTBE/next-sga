import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import dynamic from 'next/dynamic'
const ICalendarLink  = dynamic(() => import('react-icalendar-link'), {
  ssr: false
});
import { NoSsr } from '@material-ui/core';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faYahoo, faApple } from '@fortawesome/free-brands-svg-icons'
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { Outlook } from 'mdi-material-ui'

const useStyles = makeStyles(theme => ({
  btn: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    }
  },
  calicons: {
    fontSize: 16,
  },
  outlookcalicon: {
    fontSize: 17,
  },
  icsdl: {
    display: "inline-block",
    textDecoration: "none",
    color: theme.palette.text.primary
  }
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

export default function AddToCal({event}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const even = {
    title: event.title,
    description: (event.infos && `${event.infos}\n`)+(event.participants && (!!event.participants[0].nom_equipe ? `Participants :${event.participants.map(part => (
      ' '+part.nom_equipe+` ${part.heure_rdv && `(RDV à ${part.heure_rdv})`}`
      ))}` : "")),
    startTime: event.datedebut.date,
    endTime: event.datefin.date,
    location: event.localisation.adresse ? event.localisation.adresse.address : event.localisation.ville,
  }

  const altformat = {
    debut: format(new Date(even.startTime), "yyyyMMdd")+'T'+format(new Date(even.startTime), "HHmmss"),
    fin: format(new Date(even.endTime), "yyyyMMdd")+'T'+format(new Date(even.endTime), "HHmmss"),
  }
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <NoSsr>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={classes.btn}
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
          <StyledMenuItem component="a" aria-label="Google-Calendar" target="_blank" rel="noopener" href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${even.title}${even.description && `&details=${even.description}`}&location=${even.location}&dates=${altformat.debut}%2F${altformat.fin}&ctz=Europe/Paris`} onClick={handleClose}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faGoogle} />
            </ListItemIcon>
            <ListItemText primary="Google" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ICalendarLink 
              event={even}
            >
              <ListItemIcon onClick={() => handleClose()}>
                <FontAwesomeIcon icon={faApple} />
              </ListItemIcon>
              <ListItemText primary="Apple Calendar" className={classes.icsdl} onClick={() => handleClose()}/>
            </ICalendarLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <ICalendarLink 
              event={even}
            >
              <ListItemIcon onClick={() => handleClose()}>
                <Outlook className={classes.outlookcalicon} />
              </ListItemIcon>
              <ListItemText primary="Outlook" className={classes.icsdl} onClick={() => handleClose()}/>
            </ICalendarLink>
          </StyledMenuItem>
          <StyledMenuItem component="a" aria-label="Yahoo-Calendar" target="_blank" rel="noopener" href={`http://calendar.yahoo.com/?v=60&TITLE=${even.title}&ST=${altformat.debut}&ET=${altformat.fin}&in_loc=${even.location}&DESC=${even.description ? even.description : "Aucune description"}&URL=${'https://sgagymfem.com/'}`} onClick={handleClose}>
            <ListItemIcon onClick={() => handleClose()}>
              <FontAwesomeIcon icon={faYahoo} />
            </ListItemIcon>
            <ListItemText primary="Yahoo" className={classes.icsdl} onClick={() => handleClose()}/>
          </StyledMenuItem>
          <StyledMenuItem>
            <ICalendarLink 
              event={even}
            >
              <ListItemIcon onClick={() => handleClose()}>
                <FontAwesomeIcon icon={faCalendarPlus} />
              </ListItemIcon>
              <ListItemText primary="Autres calendriers" className={classes.icsdl} onClick={() => handleClose()}/>
            </ICalendarLink>
          </StyledMenuItem>
        </StyledMenu>
      </NoSsr>
    </div>
  );
}