import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import CommonContext from '../states/context';
import { regEmail, regPass } from '../utils/validate';
import { db, auth } from '../../firebase';

const Signup: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    pwConfirm: '',
  });

  const onSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    // 確認用パスワードは正しいか
    if (user.password !== user.pwConfirm) {
      dispatch({ type: 'errorUnmatchPassword' });
      return;
    }

    try {
      // Firebase Authにて新規ユーザサインイン
      // ユーザーのログイン状態継続時間指定（LOCAL：ブラウザを閉じても情報保持）
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      // サインイン後の返り値はdataに代入
      const data = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );

      // FireStoreにdocumentを追加
      await db
        .collection('publicProfiles')
        .doc(data.user.uid)
        .set({ email: user.email });

      setSubmitting(true);
      dispatch({
        type: 'userSignUp',
        payload: { email: user.email, id: data.user.uid },
      });
      await Router.push('/settings');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        dispatch({ type: 'errorEmailAlreadyInUse' });
      }
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on signup]`,
      });
    }
  };

  // サインイン状態でこのページにアクセスした際、標準でchatへリダイレクトする
  // submitting: trueのときだけ、この機能をOFFにする（settingsへの遷移とバッティングするため）
  // アンマウント後にクリーンナップ関数でsubmitting:falseに変更
  useEffect(() => {
    if (!state.user.email) return;
    if (submitting) return;
    Router.push('/chat');
    return () => {
      setSubmitting(false);
    };
  }, [state.user.email, submitting]);

  return (
    !state.user.email && (
      <div>
        <Typography variant="h1">新規登録</Typography>
        <form onSubmit={onSignupSubmit}>
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
            style={{ marginBottom: 16 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <TextField
            fullWidth
            error={state.error.errorPart === 'pwConfirm'}
            type="password"
            label="パスワード（確認用）"
            onChange={(e) => setUser({ ...user, pwConfirm: e.target.value })}
            style={{ marginBottom: 40 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <Box textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              新規登録
            </Button>
          </Box>
        </form>
      </div>
    )
  );
};

export default Signup;
