import Router from 'next/router';
import { db, auth, firebase } from '../../firebase';
import { Action } from '../states/reducer';
import { guestEmail, guestPassword, defaultRoom } from '../vars';

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
      guestEmail,
      guestPassword
    );

    // DBからユーザー情報を取得
    const user = await db.collection('publicProfiles').doc(data.user.uid).get();

    dispatch({
      type: 'userSignIn',
      payload: {
        id: data.user.uid,
        name: user.data().name as string,
        thumb: user.data().thumb as string,
        email: guestEmail,
      },
    });

    // currentRoomをデフォルトルームに設定
    dispatch({ type: 'currentRoomSwitch', payload: defaultRoom });

    await Router.push(`/chat/${defaultRoom}`);
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = {
      code: string;
      message: string;
    };
    const customError = error as CustomErrorType;
    switch (customError.code) {
      case 'auth/user-not-found':
        dispatch({ type: 'errorUserNotFound' });
        return;

      case 'auth/wrong-password':
        dispatch({ type: 'errorWrongPassword' });
        return;
      default:
        dispatch({
          type: 'errorOther',
          payload: `エラー内容：${customError.message} [on firebase/guestSignIn]`,
        });
    }
  }
};

export default guestSignIn;
