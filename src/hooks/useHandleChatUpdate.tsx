import { useState, useEffect } from 'react';
import { db, firebase } from '../../firebase';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';

type Chat = {
  id: number;
  name: string;
  thumb: string;
  createdAt: string;
  description: string;
};
type User = {
  id: number;
  name: string;
  thumb: string;
  createdAt: string;
  updatedAt: string;
};

const useHandleChatUpdate = (
  dispatch: React.Dispatch<Action>,
  state: State
): [
  typeof draft,
  typeof setDraft,
  typeof chats,
  typeof onPostSubmit,
  typeof onDeleteAllClick
] => {
  const [draft, setDraft] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const f = async () => {
      try {
        // 各ユーザーの情報を取得
        const usersOnDb = await db.collection('publicProfiles').get();
        const usersArray = usersOnDb.docs.map((user) => ({
          id: user.id,
          ...user.data(),
        }));
        setUsers(usersArray);
      } catch (error) {
        console.log(error);
      }
    };
    void f();
  }, []);

  useEffect(() => {
    // リアルタイムでの更新
    db.collection('chats').onSnapshot((snapshot) => {
      console.log(snapshot.docs[0].data());
      const formedSnapshot = snapshot.docs.map((doc) => {
        const filteredUser = users.filter(
          (user) => user.id === doc.data().publicProfiles.id
        )[0];
        console.log(filteredUser);

        return {
          id: Number(doc.id),
          name: filteredUser?.name,
          thumb: filteredUser?.thumb,
          createdAt: doc.data().createdAt?.toDate().toString(),
          description: doc.data().description,
        };
      });

      setChats(formedSnapshot);
    });
  }, [users]);

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const y = date.getFullYear();
    const m = `00${date.getMonth() + 1}`.slice(-2);
    const d = `00${date.getDate()}`.slice(-2);
    const h = `00${date.getHours()}`.slice(-2);
    const min = `00${date.getMinutes()}`.slice(-2);
    const idGeneratedFromDate = Number(date);

    // 投稿内容は入力されているか
    if (draft === '') {
      dispatch({ type: 'errorEmptyDraft' });
      return;
    }

    try {
      await db
        .collection('chats')
        .doc(idGeneratedFromDate.toString())
        .set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          publicProfiles: db.doc(`publicProfiles/${state.user.id}`),
          description: draft,
        });

      setDraft('');
    } catch (error) {
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on chat-onPostSubmit]`,
      });
    }
  };

  const onDeleteAllClick = () => {
    const agreed = window.confirm('本当にすべてのチャット履歴を削除しますか？');
    if (!agreed) return;
    // deleteAllの処理
    console.log('all posts deleted');
  };

  return [draft, setDraft, chats, onPostSubmit, onDeleteAllClick];
};

export default useHandleChatUpdate;
