import { db, firebase } from '../../firebase';
import { Action } from '../states/reducer';

const postChat = async (
  id: string,
  userId: string,
  draft: string,
  setDraft: React.Dispatch<React.SetStateAction<string>>,
  dispatch: React.Dispatch<Action>
): Promise<void> => {
  try {
    await db
      .collection('chats')
      .doc(id)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        publicProfiles: db.doc(`publicProfiles/${userId}`),
        description: draft,
      });

    setDraft('');
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = {
      message: string;
    };
    const customError = error as CustomErrorType;
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on firebase/postChat]`,
    });
  }
};

export default postChat;
