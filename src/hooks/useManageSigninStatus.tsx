import { useEffect } from 'react';
import Router from 'next/router';
import { auth, db } from '../../firebase';
import { Action } from '../states/reducer';

const useManageSigninStatus = (dispatch: React.Dispatch<Action>): void => {
  useEffect(() => {
    let publicProfiles = null;

    // ユーザーのログイン状態を監視
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        // ユーザーが検出されたら、signInの処理
        console.log(3);
        if (user) {
          publicProfiles = await db
            .collection('publicProfiles')
            .doc(user.uid)
            .get();

          dispatch({
            type: 'userSignIn',
            payload: {
              id: user.uid,
              name: publicProfiles.data().name,
              email: user.email,
              thumb: publicProfiles.data().thumb,
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
        console.log(error);
        dispatch({
          type: 'errorOther',
          payload: '認証関係でエラーが発生しました',
        });
      }
    });
    return () => {
      publicProfiles && publicProfiles;
      unsubscribe();
    };
  }, []);
};

export default useManageSigninStatus;
