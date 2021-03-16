import { useContext, useEffect } from 'react';
import Router from 'next/router';
import CommonContext from '../context';

const chat = () => {
  const { auth } = useContext(CommonContext);
  const onPostSubmit = (e) => {
    e.preventDefault();
    alert('done');
  };

  useEffect(() => {
    !auth && Router.push('/');
  }, [auth]);

  return (
    auth && (
      <div>
        <h1>チャット</h1>
        <ul>
          <li>
            <div>
              <img href="" />
              <p>username</p>
            </div>
            <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
          </li>
          <li>
            <div>
              <img href="" />
              <p>username</p>
            </div>
            <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
          </li>
          <li>
            <div>
              <img href="" />
              <p>username</p>
            </div>
            <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
          </li>
          <li>
            <div>
              <img href="" />
              <p>username</p>
            </div>
            <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
          </li>
        </ul>
        <form onSubmit={onPostSubmit}>
          <input placeholder="投稿内容を入力しましょう" />
          <input type="submit" value="投稿する" />
        </form>
      </div>
    )
  );
};

export default chat;
