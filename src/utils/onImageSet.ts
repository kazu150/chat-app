import { Action } from '../states/reducer';
import { Data } from '../hooks/useHandleSettings';

const onImageSet = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSrc: React.Dispatch<React.SetStateAction<File>>,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>,
  dispatch: React.Dispatch<Action>
): void => {
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

export default onImageSet;
