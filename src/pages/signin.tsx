import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import useHandleSignIn from '../hooks/useHandleSignIn';
import CommonContext from '../states/context';

const Signin: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [user, setUser, onSigninSubmit] = useHandleSignIn();

  useEffect(() => {
    const f = async () => {
      try {
        if (!state.user.email) return;
        await Router.push('/chat');
      } catch (error: unknown) {
        // エラー内容を型安全に処理するため、カスタム型に代入
        type CustomErrorType = { message: string };
        const customError = error as CustomErrorType;
        dispatch({
          type: 'errorOther',
          payload: `エラー内容：${customError.message} [on signup]`,
        });
      }
    };
    void f();
  }, [state.user.email, dispatch]);

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
