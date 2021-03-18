import { useState, useContext } from 'react';
import firebase from 'firebase/app';
import Router from 'next/router';
import { db, auth } from '../../firebase';
import { regEmail, regPass } from '../utils/validate';
import CommonContext from '../states/context';

const useHandleSignIn = (): [
  typeof user,
  typeof setUser,
  typeof onSigninSubmit
] => {
  const { dispatch } = useContext(CommonContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onSigninSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
      // ユーザーのログイン状態継続時間指定（SESSION：ブラウザを開いている間は情報保持）
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const data = await auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );

      const userDataOnDb = await db
        .collection('publicProfiles')
        .doc(data.user.uid)
        .get();

      dispatch({
        type: 'userSignIn',
        payload: {
          id: data.user.uid,
          name: userDataOnDb.data().name,
          thumb: userDataOnDb.data().thumb,
          email: user.email,
        },
      });
      await Router.push('/chat');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        dispatch({ type: 'errorUserNotFound' });
        return;
      }
      if (error.code === 'auth/wrong-password') {
        dispatch({ type: 'errorWrongPassword' });
        return;
      }
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on useHandleSignIn]`,
      });
    }
  };

  return [user, setUser, onSigninSubmit];
};

export default useHandleSignIn;
