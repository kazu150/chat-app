import { firebase, db } from '../../firebase';
import { Action } from '../states/reducer';
import fetchRooms from './fetchRooms';
import fetchUsers from './fetchUsers';
import signOut from './signOut';

const manageSignInStatus = async (
  dispatch: React.Dispatch<Action>,
  user: firebase.User
): Promise<(() => void)[]> => {
  let unsubscribeRooms: () => void;
  let unsubscribeUsers: () => void;

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

      // 全ルームをリアルタイム取得
      unsubscribeRooms = fetchRooms(dispatch);

      // 全ユーザーをリアルタイム取得
      unsubscribeUsers = fetchUsers(dispatch);

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

  return [unsubscribeRooms, unsubscribeUsers];
};

export default manageSignInStatus;
