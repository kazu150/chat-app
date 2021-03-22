import { firebase, db } from '../../firebase';
import { Action } from '../states/reducer';
import signOut from './signOut';

const manageSignInStatus = async (
  dispatch: React.Dispatch<Action>,
  user: firebase.User
): Promise<void> => {
  try {
    // ユーザーが検出されたら、signInの処理
    if (user) {
      const publicProfiles = await db
        .collection('publicProfiles')
        .doc(user.uid)
        .get();

      dispatch({
        type: 'userSignIn',
        payload: {
          id: user.uid,
          thumb: publicProfiles.data().thumb as string,
          name: publicProfiles.data().name as string,
          email: user.email,
        },
      });

      // ユーザーが検出されなかったら、signOutの処理
    } else {
      await signOut(dispatch);
    }
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = {
      message: string;
    };
    const customError = error as CustomErrorType;
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on firebase/manageSignInStatus]`,
    });
  }
};

export default manageSignInStatus;
