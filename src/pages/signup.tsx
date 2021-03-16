import { useContext, useEffect } from 'react';
import Router from 'next/router';
import CommonContext from '../context';

const signup = () => {
  const { auth, setAuth } = useContext(CommonContext);
  const onSignupSubmit = (e) => {
    e.preventDefault();
    setAuth(true);
    Router.push('/settings');
  };

  useEffect(() => {
    auth && Router.push('/chat');
  }, [auth]);

  return (
    !auth && (
      <div>
        <h1>新規登録</h1>
        <form onSubmit={onSignupSubmit}>
          <input placeholder="example@example.com" />
          <input type="password" placeholder="●●●●●●●●" />
          <input type="password" placeholder="●●●●●●●●" />
          <input type="submit" value="送信する" />
        </form>
      </div>
    )
  );
};

export default signup;
