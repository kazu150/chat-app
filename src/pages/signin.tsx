import { useContext, useEffect } from 'react';
import Router from 'next/router';
import CommonContext from '../context';

const signin = () => {
  const { auth, setAuth } = useContext(CommonContext);
  const onSigninSubmit = (e) => {
    e.preventDefault();
    setAuth(true);
    Router.push('/chat');
  };

  useEffect(() => {
    auth && Router.push('/chat');
  }, [auth]);

  return (
    !auth && (
      <div>
        <h1>サインイン</h1>
        <form onSubmit={onSigninSubmit}>
          <input placeholder="example@example.com" />
          <input type="password" placeholder="●●●●●●●●" />
          <input type="submit" value="送信する" />
        </form>
      </div>
    )
  );
};

export default signin;
