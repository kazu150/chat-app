import Router from 'next/router';
import { db, auth, firebase } from '../../firebase';
import { Action } from '../states/reducer';

const signUp = async (
  email: string,
  password: string,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: React.Dispatch<Action>
): Promise<void> => {
  try {
    // Firebase Authにて新規ユーザサインイン
    // ユーザーのログイン状態継続時間指定（LOCAL：ブラウザを閉じても情報保持）
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    // サインイン後の返り値はdataに代入
    const data = await auth.createUserWithEmailAndPassword(email, password);

    // FireStoreにdocumentを追加
    await db.collection('publicProfiles').doc(data.user.uid).set({
      thumb: '',
      name: '名無し之助',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSubmitting(true);
    dispatch({
      type: 'userSignUp',
      payload: { email, id: data.user.uid },
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

export default signUp;