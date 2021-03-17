import { createStyles, makeStyles } from '@material-ui/core/styles';
import { NextComponentType } from 'next';

const useStyles = makeStyles(() =>
  createStyles({
    copyRight: {
      textAlign: 'center',
      marginTop: '40px',
      marginBottom: '60px',
    },
  })
);

const Footer: NextComponentType = () => {
  const classes = useStyles();
  return (
    <div className={classes.copyRight}>
      <small>© nekoneko Company 2021</small>
    </div>
  );
};

export default Footer;
