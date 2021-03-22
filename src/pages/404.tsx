import { NextPage } from 'next';
import Head from 'next/head';
import { Typography, Box } from '@material-ui/core';

const NoContents: NextPage = () => {
  return (
    <>
      <Head>
        <title>ゆるふわちゃっと | ページがありません</title>
      </Head>
      <Box textAlign="center">
        <Typography variant="h1">404 | このページは存在しません！</Typography>
      </Box>
    </>
  );
};

export default NoContents;
