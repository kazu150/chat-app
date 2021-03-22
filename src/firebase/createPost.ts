import { db, firebase } from '../../firebase';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';

const createPost = async (
  roomId: string,
  postId: string,
  userId: string,
  dispatch: React.Dispatch<Action>,
  state: State
): Promise<void> => {
  try {
    await db
      .collection('rooms')
      .doc(roomId)
      .collection('chats')
      .doc(postId)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        publicProfiles: db.doc(`publicProfiles/${userId}`),
        description: state.drafts[roomId],
      });

    // 投稿した下書きだけstateから削除
    dispatch({ type: 'draftsUpdate', payload: { [roomId]: '' } });
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = {
      message: string;
    };
    const customError = error as CustomErrorType;
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on firebase/createPost]`,
    });
  }
};

export default createPost;
