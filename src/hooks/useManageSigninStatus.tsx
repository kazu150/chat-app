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
    let unsubscribeRooms: () => void = () => null;
    let unsubscribeUsers: () => void = () => null;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      [unsubscribeRooms, unsubscribeUsers] = await manageSignInStatus(
        dispatch,
        user
      );

      // 現在のRoomをcurrentRoomに設定
      if (roomId) {
        dispatch({
          type: 'currentRoomSwitch',
          payload: roomId,
        });

        // state.currentRoomがある場合、何もしない
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
      unsubscribe();
      unsubscribeRooms();
      unsubscribeUsers();
    };
    // state.currentRoomの変更時は特に処理がないので依存変数への登録は不要
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, roomId]);
};

export default useManageSigninStatus;
