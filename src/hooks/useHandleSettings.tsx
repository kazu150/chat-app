import { useState, useEffect } from 'react';
import { State } from '../states/initialState';
import { Action } from '../states/reducer';
import updateUser from '../firebase/updateUser';
import saveImage from '../firebase/saveImage';

const useHandleSettings = (
  state: State,
  dispatch: React.Dispatch<Action>
): [
  typeof onSettingsSubmit,
  typeof onImageSet,
  typeof data,
  typeof setData
] => {
  const [data, setData] = useState({
    thumb: '',
    name: '',
  });
  const [src, setSrc] = useState<File>(null);
  useEffect(() => {
    console.log('data', data);
    console.log('src', src);
  });

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
    if (src) {
      // 画像をsetしている場合
      const path = await saveImage(src, dispatch);
      void updateUser(state.user.id, data.name, path, dispatch);
    } else {
      // 画像をsetしていない場合
      void updateUser(state.user.id, data.name, data.thumb, dispatch);
    }
  };

  const onImageSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;

    // 上限サイズは2MB
    if (files[0].size > 2000000) {
      dispatch({ type: 'errorTooBigImageSize', payload: 2000000 });
      return;
    }

    // JPG/GIF/PNG画像ファイル以外はNG
    if (
      files[0].type !== 'image/jpeg' &&
      files[0].type !== 'image/jpg' &&
      files[0].type !== 'image/gif' &&
      files[0].type !== 'image/png'
    ) {
      dispatch({ type: 'errorInvalidImageFiles' });
      return;
    }

    // ローカルの画像ファイルをstateに設定
    setSrc(files[0]);
    // プレビュー画像パスをstateに設定
    setData({
      thumb: window.URL.createObjectURL(files[0]),
      name: data.name,
    });
  };

  return [onSettingsSubmit, onImageSet, data, setData];
};

export default useHandleSettings;
