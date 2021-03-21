import { firebase } from '../../firebase';
import { Action } from '../states/reducer';
import fetchRooms from './fetchRooms';
import fetchUsers from './fetchUsers';
import signOut from './signOut';

const manageSignInStatus = async (
  dispatch: React.Dispatch<Action>,
  user: firebase.User,
  publicProfiles: firebase.firestore.DocumentSnapshot<
    firebase.firestore.DocumentData
  >
): Promise<void> => {
  try {
    // ユーザーが検出されたら、signInの処理
    if (user) {
      // const publicProfiles = await db
      //   .collection('publicProfiles')
      //   .doc(user.uid)
      //   .get();

      dispatch({
        type: 'userSignIn',
        payload: {
          id: user.uid,
          name: publicProfiles.data().name as string,
          email: user.email,
          thumb: publicProfiles.data().thumb as string,
        },
      });

      // 全ルームをリアルタイム取得
      fetchRooms(dispatch);

      // 全ユーザーをリアルタイム取得
      fetchUsers(dispatch);

      // ユーザーが検出されなかったら、signOutの処理
    } else {
      await signOut(dispatch);
    }
  } catch (error) {
    dispatch({
      type: 'errorOther',
      payload: '認証関係でエラーが発生しました',
    });
  }
};

export default manageSignInStatus;
