import Router from 'next/router';
import { db, firebase } from '../../firebase';
import { Action } from '../states/reducer';

const updateUser = async (
  id: string,
  name: string,
  thumb: string,
  dispatch: React.Dispatch<Action>
): Promise<void> => {
  try {
    // DBをupdate
    await db.collection('publicProfiles').doc(id).update({
      thumb,
      name,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch({ type: 'userUpdate', payload: { thumb, name } });

    await Router.push('/chat');
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = { message: string };
    const customError = error as CustomErrorType;
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on updateUser]`,
    });
  }
};

export default updateUser;
