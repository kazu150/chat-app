import { Action } from '../states/reducer';
import { db, firebase } from '../../firebase';

const createRoom = async (
  dispatch: React.Dispatch<Action>,
  title: string,
  description: string
): Promise<void> => {
  try {
    await db.collection('rooms').doc().set({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      title,
      description,
    });
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
