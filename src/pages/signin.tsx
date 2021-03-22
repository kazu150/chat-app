import { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import useHandleSignIn from '../hooks/useHandleSignIn';
import CommonContext from '../states/context';

const Signin: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [user, setUser, onSigninSubmit] = useHandleSignIn(state, dispatch);

  return (
    !state.user.email && (
      <div>
        <Head>
          <title>ゆるふわちゃっと | サインイン</title>
        </Head>
        <Typography variant="h1">サインイン</Typography>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            return onSigninSubmit(e);
          }}
        >
          <TextField
            autoFocus
            fullWidth
            error={state.error.errorPart === 'email'}
            label="Eメール"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{ marginBottom: 16 }}
            placeholder="example@example.com"
            variant="outlined"
          />
          <TextField
            fullWidth
            error={state.error.errorPart === 'password'}
            type="password"
            label="パスワード"
            autoComplete="off"
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
