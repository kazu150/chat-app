import { useContext } from 'react';
import CommonContext from '../states/context';
import useManageSigninStatus from '../hooks/useManageSigninStatus';

const Auth = (): JSX.Element => {
  const { state, dispatch } = useContext(CommonContext);
  console.log('アンマウントされてません！');
  useManageSigninStatus(dispatch, state);
  return <div />;
};

export default Auth;
