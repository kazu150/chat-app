import Router from 'next/router';
import { Action } from '../states/reducer';
import { db, firebase } from '../../firebase';

const createRoom = async (
  dispatch: React.Dispatch<Action>,
  title: string,
  description: string
): Promise<void> => {
  try {
    const doc = await db.collection('rooms').add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      title,
      description,
    });

    // 作成したルームに遷移
    await Router.push(`/chat/${doc.id}`);

    // currentRoomを変更
    dispatch({ type: 'currentRoomSwitch', payload: doc.id });
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = { message: string };
    const customError = error as CustomErrorType;

    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on firebase/guestSignIn]`,
    });
  }
};

export default createRoom;
