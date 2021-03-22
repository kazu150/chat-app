import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Action } from '../states/reducer';
import { State, Room } from '../states/initialState';
import fetchPosts, { Chat } from '../firebase/fetchPosts';
import createPost from '../firebase/createPost';
import { chatMaxLength as maxLength } from '../vars';

const useHandleChatUpdate = (
  dispatch: React.Dispatch<Action>,
  state: State
): [Chat[], typeof onPostSubmit, typeof onDeleteAllClick, Room, string] => {
  const [chats, setChats] = useState<Chat[]>([]);

  const [room, setRoom] = useState<Room>({
    id: '',
    createdAt: '',
    title: '',
    description: '',
  });
  const router = useRouter();
  const { roomId } = router.query;

  // 現在のroomをstateにセット
  useEffect(() => {
    const fetchedRoom = state.rooms.filter((data) => {
      return data.id === roomId;
    })[0];
    // fetchedRoomが確実に取得できるまでsetしない（nullが入るのを防ぐ）
    if (!fetchedRoom) return;
    setRoom(fetchedRoom);
  }, [roomId, state.rooms]);

  // Chatの内容をリアルタイムで更新
  useEffect(() => {
    const unsubscribe = fetchPosts(
      roomId as string,
      setChats,
      state.publicProfiles
    );
    return () => {
      // チャットページをunmountするときにクリーンアップ
      unsubscribe();
    };
    // publicProfilesの中身が更新された時に再レンダーする
    // （新規ユーザー登録時、既存ユーザープロフィール更新時）
  }, [state.publicProfiles, roomId]);

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const id = Number(date).toString();

    // 投稿内容は入力されているか
    if (!state.drafts[roomId as string]) {
      dispatch({ type: 'errorEmptyDraft' });
      return;
    }

    // 最大文字数オーバーしていないか
    if (state.drafts[roomId as string].length > maxLength) {
      dispatch({ type: 'errorExcessMaxLength', payload: maxLength });
      return;
    }

    try {
      await createPost(roomId as string, id, state.user.id, dispatch, state);
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

  return [chats, onPostSubmit, onDeleteAllClick, room, roomId as string];
};

export default useHandleChatUpdate;
