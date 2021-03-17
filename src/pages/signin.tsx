import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import CommonContext from '../context';

const Signin: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const onSigninSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'signin' });
    await Router.push('/chat');
  };

  useEffect(() => {
    state.auth && Router.push('/chat');
  }, [state.auth]);

  return (
    !state.auth && (
      <div>
        <Typography variant="h1">サインイン</Typography>
        <form onSubmit={onSigninSubmit}>
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

export default Signin;
