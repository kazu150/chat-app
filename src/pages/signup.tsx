import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import CommonContext from '../states/context';

const Signup: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const onSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'userSignUp',
      payload: {
        name: 'クロネコてすと',
        email: 'example@example.com',
        thumb: 'avatar.png',
      },
    });
    await Router.push('/settings');
  };

  // SignInSubmitとバッティングするためいまは保留
  // useEffect(() => {
  //   state.user.email && Router.push('/chat');
  // }, [state.user.email]);

  return (
    !state.user.email && (
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

export default Signup;
