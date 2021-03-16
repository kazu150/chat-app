import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    copyRight: {
      textAlign: 'center',
      marginTop: '40px',
    },
  })
);

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.copyRight}>
      <small>© nekoneko Company 2021</small>
    </div>
  );
};

export default Footer;
