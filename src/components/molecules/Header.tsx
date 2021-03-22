import { useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { NextComponentType } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import Drawer from './Drawer';
import CommonContext from '../../states/context';
import signOut from '../../firebase/signOut';

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
      cursor: 'pointer',
      marginRight: 'auto',
    },
  })
);

const Header: NextComponentType = () => {
  const { state, dispatch } = useContext(CommonContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const matches = useMediaQuery('(min-width:600px)');

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSignOut = () => {
    // サインアウト
    void signOut(dispatch);
    // メニューを閉じる
    handleClose();
  };

  const handleClickSettings = async () => {
    try {
      await Router.push('/settings');
      handleClose();
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = {
        message: string;
      };
      const customError = error as CustomErrorType;
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on signup]`,
      });
    }
  };

  return (
    <>
      <Head>
        <title>ゆるふわちゃっと</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {state.user.email && <Drawer />}
            <Link href="/">
              <Typography variant="h2" className={classes.title}>
                ゆるふわちゃっと
              </Typography>
            </Link>
            {state.user.email ? (
              <div>
                <Typography variant="button">
                  {matches && `${state.user.name}さん`}
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar
                    alt={state.user.name || 'アバター'}
                    src={state.user.thumb || '/avatar.png'}
                  />
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
                  open={Boolean(anchorEl)}
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
