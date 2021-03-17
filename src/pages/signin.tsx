import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import CommonContext from '../states/context';

const Signin: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onSigninSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'userSignIn',
      payload: {
        email: user.email,
      },
    });
    await Router.push('/chat');
  };

  useEffect(() => {
    const f = async () => {
      try {
        if (!state.user.email) return;
        await Router.push('/chat');
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [state.user.email]);

  return (
    !state.user.email && (
      <div>
        <Typography variant="h1">サインイン</Typography>
        <form onSubmit={onSigninSubmit}>
          <TextField
            required
            fullWidth
            label="Eメール"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{ marginBottom: 16 }}
            placeholder="example@example.com"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            type="password"
            label="パスワード"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
