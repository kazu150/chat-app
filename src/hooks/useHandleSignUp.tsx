import { useState, useEffect } from 'react';
import Router from 'next/router';
import { regEmail, regPass } from '../utils/validate';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';
import signUp from '../firebase/signUp';

const useHandleSignUp = (
  state: State,
  dispatch: React.Dispatch<Action>
): [typeof user, typeof setUser, typeof onSignupSubmit] => {
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    pwConfirm: '',
  });

  const onSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    void signUp(user.email, user.password, setSubmitting, dispatch);
  };

  // サインイン状態でこのページにアクセスした際、標準でchatへリダイレクトする
  // submitting: trueのときだけ、この機能をOFFにする（settingsへの遷移とバッティングするため）
  // アンマウント後にクリーンナップ関数でsubmitting:falseに変更
  useEffect(() => {
    if (!state.user.email) return;
    if (submitting) return;
    void Router.push('/chat');
    // eslint-disable-next-line consistent-return
    return () => {
      setSubmitting(false);
    };
  }, [state.user.email, submitting]);

  return [user, setUser, onSignupSubmit];
};

export default useHandleSignUp;
