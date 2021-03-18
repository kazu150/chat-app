import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import useHandleSignIn from '../hooks/useHandleSignIn';
import CommonContext from '../states/context';
import { auth, db } from '../../firebase';

const Signin: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [user, setUser, onSigninSubmit] = useHandleSignIn();

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
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            return onSigninSubmit(e);
          }}
        >
          <TextField
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
