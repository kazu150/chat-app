import { NextPage } from 'next';
import Head from 'next/head';

const NoContents: NextPage = () => {
  return (
    <>
      <Head>
        <title>ページがありません</title>
      </Head>
      <div>404 | このページは存在しません！</div>
    </>
  );
};

export default NoContents;
