import { useState, useContext } from 'react';
import Router from 'next/router';
import { db, auth, firebase } from '../../firebase';
import CommonContext from '../states/context';

const useGuestSignIn = (): [typeof onSigninSubmit] => {
  const { dispatch } = useContext(CommonContext);

  const onSigninSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      // ユーザーのログイン状態継続時間指定（SESSION：ブラウザを開いている間は情報保持）
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const data = await auth.signInWithEmailAndPassword(
        process.env.NEXT_PUBLIC_GUEST_ID,
        process.env.NEXT_PUBLIC_GUEST_PW
      );

      const userDataOnDb = await db
        .collection('publicProfiles')
        .doc(data.user.uid)
        .get();

      dispatch({
        type: 'userSignIn',
        payload: {
          id: data.user.uid,
          name: userDataOnDb.data().name,
          thumb: userDataOnDb.data().thumb,
          email: process.env.NEXT_PUBLIC_GUEST_ID,
        },
      });
      await Router.push('/chat');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        dispatch({ type: 'errorUserNotFound' });
        return;
      }
      if (error.code === 'auth/wrong-password') {
        dispatch({ type: 'errorWrongPassword' });
        return;
      }
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on useGuestSignIn]`,
      });
    }
  };

  return [onSigninSubmit];
};

export default useGuestSignIn;
