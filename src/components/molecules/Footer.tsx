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
  const date = new Date();
  return (
    <div className={classes.copyRight}>
      <small>{`© ${date.getFullYear()} nekoneko Company`}</small>
    </div>
  );
};

export default Footer;
