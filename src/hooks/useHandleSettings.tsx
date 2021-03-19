import { useState, useEffect } from 'react';
import Router from 'next/router';
import { db, firebase, storage } from '../../firebase';
import { State } from '../states/initialState';
import { Action } from '../states/reducer';

const useHandleSettings = (
  state: State,
  dispatch: React.Dispatch<Action>
): [
  typeof preview,
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
  const [preview, setPreview] = useState('');

  // ページをロードした際に、ユーザー情報を更新
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

    try {
      // cloud Storageに画像を保存
      await storage.ref(`/images/${src.name}`).put(src);

      // 保存したパスを返り値かなんかで取得
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const pathReference: Promise<string> = await storage
        .ref(`/images/${src.name}`)
        .getDownloadURL();

      // DBをupdate。thumbにはcloud storageの画像保存先パスを入れる
      await db.collection('publicProfiles').doc(state.user.id).update({
        thumb: pathReference,
        name: data.name,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      dispatch({ type: 'userModProfile', payload: data });
      await Router.push('/chat');
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = { message: string };
      const customError = error as CustomErrorType;
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on settings]`,
      });
    }
  };

  const onImageSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    // ローカルの画像ファイルをstateに設定
    setSrc(files[0]);
    // プレビュー画像をstateに設定
    setPreview(window.URL.createObjectURL(files[0]));
  };

  return [preview, onSettingsSubmit, onImageSet, data, setData];
};

export default useHandleSettings;
