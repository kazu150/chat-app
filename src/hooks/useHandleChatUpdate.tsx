import { useState, useEffect } from 'react';
import { Action } from '../states/reducer';
import { State } from '../states/initialState';
import fetchPosts, { Chat } from '../firebase/fetchPosts';
import createPost from '../firebase/createPost';
import { chatMaxLength as maxLength } from '../vars';

const useHandleChatUpdate = (
  dispatch: React.Dispatch<Action>,
  state: State,
  roomId: string
): [
  typeof drafts,
  typeof setDrafts,
  typeof chats,
  typeof onPostSubmit,
  typeof onDeleteAllClick
] => {
  const [drafts, setDrafts] = useState<{ [key: string]: string }>({});
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    console.log(drafts);
    console.log(chats);
  });

  // Chatの内容をリアルタイムで更新
  useEffect(() => {
    const unsubscribe = fetchPosts(roomId, setChats, state.publicProfiles);
    // usersの中身が更新された時に再レンダーする
    // （新規ユーザー登録時、既存ユーザープロフィール更新時）
    return () => {
      unsubscribe;
    };
  }, [state.publicProfiles, roomId]);

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const id = Number(date).toString();

    // 投稿内容は入力されているか
    if (!drafts.roomId) {
      dispatch({ type: 'errorEmptyDraft' });
      return;
    }

    // 最大文字数オーバーしていないか
    if (drafts.roomId.length > maxLength) {
      dispatch({ type: 'errorExcessMaxLength', payload: maxLength });
      return;
    }

    try {
      await createPost(roomId, id, state.user.id, drafts, setDrafts, dispatch);
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

  return [drafts, setDrafts, chats, onPostSubmit, onDeleteAllClick];
};

export default useHandleChatUpdate;
