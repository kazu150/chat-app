import React from 'react';
import Head from 'next/head';

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
          <button>ログイン（ログアウト）</button>
        </div>
      </div>
    </>
  );
};

export default Header;
