import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import CommonContext from '../states/context';
import { regEmail, regPass } from '../utils/validate';
import { auth } from '../../firebase';

const Signin: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onSigninSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // メールは入力されているか
    if (user.email === '') {
      dispatch({ type: 'errorEmptyMail' });
      return;
    }
    // メールの形式は正しいか
    if (!regEmail.test(user.email)) {
      dispatch({ type: 'errorInvalidEmail' });
      return;
    }
    // パスワードは入力されているか
    if (user.password === '') {
      dispatch({ type: 'errorEmptyPassword' });
      return;
    }
    // パスワードの形式は正しいか
    if (!regPass.test(user.password)) {
      dispatch({ type: 'errorInvalidPassword' });
      return;
    }

    try {
      // ユーザーのログイン状態継続時間指定（LOCAL：ブラウザを閉じても情報保持）
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const data = await auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );

      dispatch({
        type: 'userSignIn',
        payload: {
          email: user.email,
        },
      });
      await Router.push('/chat');
    } catch (error) {
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on signin]`,
      });
    }
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
