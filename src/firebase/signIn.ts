import Router from 'next/router';
import { db, auth, firebase } from '../../firebase';
import { Action } from '../states/reducer';
import { defaultRoom } from '../vars';

const signIn = async (
  email: string,
  password: string,
  dispatch: React.Dispatch<Action>
): Promise<void> => {
  try {
    // ユーザーのログイン状態継続時間指定（LOCAL：ブラウザを閉じても情報保持）
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const data = await auth.signInWithEmailAndPassword(email, password);

    const user = await db.collection('publicProfiles').doc(data.user.uid).get();

    dispatch({
      type: 'userSignIn',
      payload: {
        id: data.user.uid,
        name: user.data().name as string,
        thumb: user.data().thumb as string,
        email,
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

export default signIn;
