import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

const Header = () => {
  return (
    <>
      <Head>
        <title>リアルタイムチャット</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h2>リアルタイムチャット</h2>
        <div>
          <button onClick={() => Router.push('/')}>
            サインアウト（サインイン時）
          </button>
          <button onClick={() => Router.push('/signup')}>
            新規登録（サインアウト時）
          </button>
          <button onClick={() => Router.push('/signin')}>
            サインイン（サインアウト時）
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
