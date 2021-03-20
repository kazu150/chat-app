import Router from 'next/router';
import { auth, db } from '../../firebase';
import { Action } from '../states/reducer';

const manageSignInStatus = (dispatch: React.Dispatch<Action>): void => {
  auth.onAuthStateChanged(async (user) => {
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
            name: publicProfiles.data().name as string,
            email: user.email,
            thumb: publicProfiles.data().thumb as string,
          },
        });
        // ユーザーが検出されなかったら、signOutの処理
      } else {
        await auth.signOut();
        dispatch({ type: 'userSignOut' });
        await Router.push('/');
        return;
      }
    } catch (error) {
      dispatch({
        type: 'errorOther',
        payload: '認証関係でエラーが発生しました',
      });
    }
  });
};

export default manageSignInStatus;
