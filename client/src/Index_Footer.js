import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Index_Header from './Index_Header';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(6),
  },
  makeItCenter: {
    marginLeft:'auto',
    marginRight:'auto',
  },
  copyright: {
    paddingTop: theme.spacing(2),
  },
}));

export default function Index_Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          <Index_Header/>
        </Typography>
        <Grid  container  md={12} justify="center" alignItems="center">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <FacebookIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <TelegramIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <TwitterIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <WhatsAppIcon />
        </IconButton>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
          {'Copyright © '}
        </Typography>
      </Container>
    </footer>      
    </React.Fragment>
  );
}
