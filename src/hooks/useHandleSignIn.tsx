import { useState, useEffect } from 'react';
import Router from 'next/router';
import { regEmail, regPass } from '../utils/validate';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';
import signIn from '../firebase/signIn';

const useHandleSignIn = (
  state: State,
  dispatch: React.Dispatch<Action>
): [typeof user, typeof setUser, typeof onSigninSubmit] => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onSigninSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    void signIn(user.email, user.password, dispatch);
  };

  // サインイン状態でアクセスした場合、chatページに遷移
  useEffect(() => {
    void (async () => {
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
    })();
  }, [state.user.email, dispatch]);

  return [user, setUser, onSigninSubmit];
};

export default useHandleSignIn;
