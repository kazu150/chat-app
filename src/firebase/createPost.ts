import { db, firebase } from '../../firebase';
import { Action } from '../states/reducer';

const createPost = async (
  roomId: string,
  postId: string,
  userId: string,
  drafts: { [key: string]: string },
  setDrafts: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  dispatch: React.Dispatch<Action>
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
        description: drafts.roo,
      });

    // 投稿した下書きだけstateから削除
    setDrafts({ ...drafts, [roomId]: '' });
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
