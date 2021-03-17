import { useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { NextComponentType } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import CommonContext from '../../context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(5),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: NextComponentType = () => {
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

  const handleClickSignOut = async () => {
    setAuth(false);
    await Router.push('/');
    handleClose();
  };

  const handleClickSettings = async () => {
    await Router.push('/settings');
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
              // eslint-disable-next-line react/jsx-wrap-multilines
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
            <Typography variant="h2" className={classes.title}>
              リアルタイムチャット
            </Typography>
            {auth ? (
              <div>
                <Typography variant="button" className={classes.title}>
                  クロネコ太郎さん
                </Typography>
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
