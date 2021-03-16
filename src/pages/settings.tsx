import { useContext, useEffect } from 'react';
import Router from 'next/router';
import CommonContext from '../context';

const settings = () => {
  const { auth } = useContext(CommonContext);

  useEffect(() => {
    !auth && Router.push('/');
  }, [auth]);

  const onSettingsSubmit = (e) => {
    e.preventDefault();
    alert('done!');
  };
  return (
    auth && (
      <div>
        <h1>設定</h1>
        <form onSubmit={onSettingsSubmit}>
          <input />
          <input type="submit" value="更新" />
        </form>
        <button onClick={() => Router.push('/chat')}>チャットへ</button>
      </div>
    )
  );
};

export default settings;
