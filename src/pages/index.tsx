import Router from 'next/router';

export default function Home() {
  return (
    <div>
      <h1>リアルタイムチャット</h1>
      <button onClick={() => Router.push('/signin')}>サインイン</button>
      <button onClick={() => Router.push('/signup')}>新規登録</button>
      <button onClick={() => Router.push('/chat')}>チャットへ</button>
    </div>
  );
}
