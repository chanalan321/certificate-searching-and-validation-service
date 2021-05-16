import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "center",    
    marginLeft: "auto"
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginTop: theme.spacing(2),
    flexShrink: 0,
    color:"#AEAEAE"
    
  },
  toolbarLink2: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginTop: theme.spacing(2),
    flexShrink: 0,    
    marginLeft: "auto",    
    
  },
}));

export default function Index_Header() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link 
            onClick={() => {
              history.push({ 
                pathname: '/'
              });    
            }}
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink2}>
          Home
        </Link>
        <Link 
            onClick={() => {
              history.push({ 
                pathname: '/Search'
              });    
            }}
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
          Search
        </Link>
        <Link 
            onClick={() => {
              history.push({ 
                pathname: '/Login'
              });    
            }}
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
          Login
        </Link>
      </Toolbar>      
    </React.Fragment>
  );
}
