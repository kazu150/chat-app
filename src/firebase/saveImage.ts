import { storage } from '../../firebase';
import { Action } from '../states/reducer';

const saveImage = async (
  src: File,
  dispatch: React.Dispatch<Action>
): Promise<string> => {
  let pathReference: Promise<string>;
  try {
    // cloud Storageに画像を保存
    await storage.ref(`/images/${src.name}`).put(src);

    // 画像保存先のパスを取得
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    pathReference = await storage.ref(`/images/${src.name}`).getDownloadURL();
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = { message: string };
    const customError = error as CustomErrorType;
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on firebase/saveImage]`,
    });
  }
  return pathReference;
};

export default saveImage;
