import { useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import CommonContext from '../../context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const { auth, setAuth } = useContext(CommonContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSignOut = () => {
    setAuth(false);
    Router.push('/');
    handleClose();
  };

  const handleClickSettings = () => {
    Router.push('/settings');
    handleClose();
  };
  return (
    <>
      <Head>
        <title>リアルタイムチャット</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              リアルタイムチャット
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickSignOut}>サインアウト</MenuItem>
                  <MenuItem onClick={handleClickSettings}>設定</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit" onClick={() => Router.push('/signup')}>
                  新規登録
                </Button>
                <Button color="inherit" onClick={() => Router.push('/signin')}>
                  サインイン
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
