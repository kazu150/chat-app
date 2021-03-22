import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';
import manageSignInStatus from '../firebase/manageSignInStatus';
import { auth } from '../../firebase';
import { defaultRoom } from '../vars';

const useManageSigninStatus = (
  dispatch: React.Dispatch<Action>,
  state: State
): void => {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    // let publicProfiles: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = null;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      await manageSignInStatus(dispatch, user);

      // 現在のRoomをcurrentRoomに設定
      if (roomId) {
        dispatch({
          type: 'currentRoomSwitch',
          payload: roomId,
        });

        // state.currentRoomがない場合、何もしない
      } else if (state.currentRoom) {
        // 現在のRoomもstate.currentRoomもない場合、defaultRoomを設定
      } else {
        dispatch({
          type: 'currentRoomSwitch',
          payload: defaultRoom,
        });
      }
    });

    return () => {
      // publicProfiles();
      // unsubscribe();
    };
  }, [dispatch, roomId]);
};

export default useManageSigninStatus;
