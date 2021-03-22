import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';
import manageSignInStatus from '../firebase/manageSignInStatus';
import fetchRooms from '../firebase/fetchRooms';
import fetchUsers from '../firebase/fetchUsers';
import { auth } from '../../firebase';
import { defaultRoom } from '../vars';

const useManageSigninStatus = (
  dispatch: React.Dispatch<Action>,
  state: State
): void => {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    // サインインステータスを追跡
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      await manageSignInStatus(dispatch, user);

      // サインアウト時は下の処理は実行しない
      if (!user) return;

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

    // 全ルームをリアルタイム取得
    const unsubscribeRooms = fetchRooms(dispatch);

    // 全ユーザーをリアルタイム取得
    const unsubscribeUsers = fetchUsers(dispatch);

    return () => {
      unsubscribeAuth();
      unsubscribeRooms();
      unsubscribeUsers();
    };
    // state.currentRoomの変更時は特に処理がないので依存変数への登録は不要
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, roomId]);
};

export default useManageSigninStatus;
