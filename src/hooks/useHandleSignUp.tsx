import { useState, useEffect } from 'react';
import Router from 'next/router';
import { regEmail, regPass } from '../utils/validate';
import { db, auth, firebase } from '../../firebase';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';

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
      await db.collection('publicProfiles').doc(data.user.uid).set({
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setSubmitting(true);
      dispatch({
        type: 'userSignUp',
        payload: { email: user.email, id: data.user.uid },
      });
      await Router.push('/settings');
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = {
        code: string;
        message: string;
      };
      const customError = error as CustomErrorType;
      if (customError.code === 'auth/email-already-in-use') {
        dispatch({ type: 'errorEmailAlreadyInUse' });
        return;
      }
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on signup]`,
      });
    }
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
