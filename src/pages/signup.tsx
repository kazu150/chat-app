import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import CommonContext from '../context';

const signup = () => {
  const { auth, setAuth } = useContext(CommonContext);
  const onSignupSubmit = (e) => {
    e.preventDefault();
    setAuth(true);
    Router.push('/settings');
  };

  // SignInSubmitとバッティングするためいまは保留
  // useEffect(() => {
  //   auth && Router.push('/chat');
  // }, [auth]);

  return (
    !auth && (
      <div>
        <Typography variant="h1">新規登録</Typography>
        <form onSubmit={onSignupSubmit}>
          <TextField
            required
            fullWidth
            label="Eメール"
            style={{ marginBottom: 16 }}
            placeholder="example@example.com"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            type="password"
            label="パスワード"
            style={{ marginBottom: 16 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            type="password"
            label="パスワード（確認用）"
            style={{ marginBottom: 40 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <Box textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              サインイン
            </Button>
          </Box>
        </form>
      </div>
    )
  );
};

export default signup;
