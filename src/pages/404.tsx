import { NextPage } from 'next';
import Head from 'next/head';
import { Typography } from '@material-ui/core';

const NoContents: NextPage = () => {
  return (
    <>
      <Head>
        <title>ページがありません</title>
      </Head>
      <Typography variant="h1">404 | このページは存在しません！</Typography>
    </>
  );
};

export default NoContents;
