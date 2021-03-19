import { useState, useContext } from 'react';
import Router from 'next/router';
import { db, auth, firebase } from '../../firebase';
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
      // ユーザーのログイン状態継続時間指定（LOCAL：ブラウザを閉じても情報保持）
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
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
          name: userDataOnDb.data().name as string,
          thumb: userDataOnDb.data().thumb as string,
          email: user.email,
        },
      });
      await Router.push('/chat');
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = {
        code: string;
        message: string;
      };
      const customError = error as CustomErrorType;
      if (customError.code === 'auth/user-not-found') {
        dispatch({ type: 'errorUserNotFound' });
        return;
      }
      if (customError.code === 'auth/wrong-password') {
        dispatch({ type: 'errorWrongPassword' });
        return;
      }
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on useHandleSignIn]`,
      });
    }
  };

  return [user, setUser, onSigninSubmit];
};

export default useHandleSignIn;
