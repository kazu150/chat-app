import { useState, useEffect } from 'react';
import Router from 'next/router';
import { State } from '../states/initialState';
import { Action } from '../states/reducer';
import updateUser from '../firebase/updateUser';
import saveImage from '../firebase/saveImage';
import { userNameMaxLength as maxLength } from '../vars';

export type Data = {
  thumb: string;
  name: string;
};

const useHandleSettings = (
  state: State,
  dispatch: React.Dispatch<Action>
): [typeof onSettingsSubmit, typeof data, typeof setData, typeof setSrc] => {
  const [data, setData] = useState<Data>({
    thumb: '',
    name: '',
  });
  const [src, setSrc] = useState<File>(null);

  // ページをロードした際に、ローカルstateがcontext内stateのユーザー情報を取得
  useEffect(() => {
    setData({
      thumb: state.user.thumb,
      name: state.user.name,
    });
  }, [state.user]);

  const onSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ユーザー名は入力されているか
    if (data.name === '') {
      dispatch({ type: 'errorEmptyName' });
      return;
    }

    // 最大文字数オーバーしていないか
    if (data.name.length > maxLength) {
      dispatch({ type: 'errorExcessMaxLength', payload: maxLength });
      return;
    }
    try {
      if (src) {
        // 画像をsetしている場合
        const path = await saveImage(src, dispatch);
        void updateUser(state.user.id, data.name, path, dispatch);
      } else {
        // 画像をsetしていない場合
        void updateUser(state.user.id, data.name, data.thumb, dispatch);
      }
      await Router.push(`/chat/${state.currentRoom}`);
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = { message: string };
      const customError = error as CustomErrorType;
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on firebase/updateUser]`,
      });
    }
  };

  return [onSettingsSubmit, data, setData, setSrc];
};

export default useHandleSettings;
