import Router from 'next/router';
import { auth } from '../../firebase';
import { Action } from '../states/reducer';

const signOut = async (dispatch: React.Dispatch<Action>): Promise<void> => {
  try {
    dispatch({ type: 'userSignOut' });
    await auth.signOut();
    await Router.push('/');
  } catch (error: unknown) {
    // エラー内容を型安全に処理するため、カスタム型に代入
    type CustomErrorType = {
      message: string;
    };
    const customError = error as CustomErrorType;
    dispatch({
      type: 'errorOther',
      payload: `エラー内容：${customError.message} [on signup]`,
    });
  }
};

export default signOut;
