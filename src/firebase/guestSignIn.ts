import Router from 'next/router';
import { db, auth, firebase } from '../../firebase';
import { Action } from '../states/reducer';

const guestSignIn = async (
  dispatch: React.Dispatch<Action>,
  e: React.MouseEvent<HTMLInputElement>
): Promise<void> => {
  e.preventDefault();
  try {
    // ユーザーのログイン状態継続時間指定（SESSION：ブラウザを開いている間は情報保持）
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    // guestアカウントでサインイン
    const data = await auth.signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_GUEST_ID,
      process.env.NEXT_PUBLIC_GUEST_PW
    );

    // DBからユーザー情報を取得
    const user = await db.collection('publicProfiles').doc(data.user.uid).get();

    dispatch({
      type: 'userSignIn',
      payload: {
        id: data.user.uid,
        name: user.data().name as string,
        thumb: user.data().thumb as string,
        email: process.env.NEXT_PUBLIC_GUEST_ID,
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
    if ('code' in customError) {
      if (customError.code === 'auth/user-not-found') {
        dispatch({ type: 'errorUserNotFound' });
        return;
      }
      if (customError.code === 'auth/wrong-password') {
        dispatch({ type: 'errorWrongPassword' });
        return;
      }
    }
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on firebase/guestSignIn]`,
    });
  }
};

export default guestSignIn;
