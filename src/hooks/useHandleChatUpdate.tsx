/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
type UserOnChat = {
  id: string;
  name: string;
  thumb: string;
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
  const [users, setUsers] = useState<UserOnChat[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  // UserOnChatの内容をリアルタイムで更新
  useEffect(() => {
    void (async () => {
      try {
        // 各ユーザーの情報を取得
        const usersOnDb = await db.collection('publicProfiles').get();
        const usersArray: UserOnChat[] = usersOnDb.docs.map((user) => ({
          id: user.id,
          name: user.data().name as string,
          thumb: user.data().thumb as string,
        }));
        setUsers(usersArray);
      } catch (error) {
        // エラー内容を型安全に処理するため、カスタム型に代入
        type CustomErrorType = {
          message: string;
        };
        const customError = error as CustomErrorType;
        dispatch({
          type: 'errorOther',
          payload: `エラー内容：${customError.message} [on useHandleSignIn]`,
        });
      }
    })();
  }, [dispatch]);

  // Chatの内容をリアルタイムで更新
  useEffect(() => {
    db.collection('chats').onSnapshot(
      (
        snapshot: firebase.firestore.QuerySnapshot<
          firebase.firestore.DocumentData
        >
      ) => {
        const formedSnapshot = snapshot.docs.map((doc) => {
          const filteredUser = users.filter(
            (user) => user.id === doc.data().publicProfiles.id
          )[0];
          const date: Date = doc.data().createdAt?.toDate();
          const y = date?.getFullYear();
          const m = `00${date?.getMonth() + 1}`.slice(-2);
          const d = `00${date?.getDate()}`.slice(-2);
          const h = `00${date?.getHours()}`.slice(-2);
          const min = `00${date?.getMinutes()}`.slice(-2);
          const formedDate = date ? `${y}/${m}/${d} ${h}:${min}` : '　';

          return {
            id: Number(doc.id),
            name: filteredUser?.name,
            thumb: filteredUser?.thumb,
            createdAt: formedDate,
            description: doc.data().description as string,
          };
        });

        setChats(formedSnapshot);
      }
    );
  }, [users]);

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
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
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = {
        message: string;
      };
      const customError = error as CustomErrorType;
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on chat-onPostSubmit]`,
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
