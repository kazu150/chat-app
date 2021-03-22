import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Action } from '../states/reducer';
import manageSignInStatus from '../firebase/manageSignInStatus';
import { auth } from '../../firebase';
import { defaultRoom } from '../vars';

const useManageSigninStatus = (dispatch: React.Dispatch<Action>): void => {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    // let publicProfiles: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = null;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      await manageSignInStatus(dispatch, user);

      // currentRoomをデフォルトルームに設定
      dispatch({ type: 'currentRoomSwitch', payload: roomId || defaultRoom });
    });

    return () => {
      // publicProfiles();
      // unsubscribe();
    };
  }, [dispatch, roomId]);
};

export default useManageSigninStatus;
