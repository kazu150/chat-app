import { useState, useEffect } from 'react';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';
import fetchUsers, { User } from '../firebase/fetchUsers';
import fetchChats, { Chat } from '../firebase/fetchChats';
import postChat from '../firebase/postChat';
import { chatMaxLength as maxLength } from '../vars';

const useHandleChatUpdate = (
  dispatch: React.Dispatch<Action>,
  state: State,
  roomId: string
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

  // User[]の内容をリアルタイムで更新
  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  // Chatの内容をリアルタイムで更新
  useEffect(() => {
    fetchChats(roomId, setChats, users);
    // usersの中身が更新された時に再レンダーする
    // （新規ユーザー登録時、既存ユーザープロフィール更新時）
  }, [users, roomId]);

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const id = Number(date).toString();

    // 投稿内容は入力されているか
    if (draft === '') {
      dispatch({ type: 'errorEmptyDraft' });
      return;
    }

    // 最大文字数オーバーしていないか
    if (draft.length > maxLength) {
      dispatch({ type: 'errorExcessMaxLength', payload: maxLength });
      return;
    }

    try {
      await postChat(id, state.user.id, draft, setDraft, dispatch);
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
