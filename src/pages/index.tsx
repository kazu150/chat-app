import { useContext } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import { Button, Box, Typography, useMediaQuery } from '@material-ui/core';
import CommonContext from '../states/context';
import guestSignIn from '../firebase/guestSignIn';
import { defaultRoom } from '../vars';

const Home: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div>
      <Head>
        <title>ゆるふわちゃっと | Home</title>
      </Head>
      <Typography variant="h1">ゆるふわちゃっと</Typography>
      <Box textAlign="center">
        <img
          src="chat.svg"
          alt="アバター"
          width={matches ? 350 : 250}
          height={matches ? 450 : 350}
        />
      </Box>
      {state.user.email ? (
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => Router.push(`/chat/${defaultRoom}`)}
          >
            チャットへ
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <Box component="span" m={0.5}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Router.push('/signup')}
            >
              新規登録
            </Button>
          </Box>
          <Box component="span" m={0.5}>
            <Button
              variant="contained"
              color="default"
              onClick={() => Router.push('/signin')}
            >
              サインイン
            </Button>
          </Box>
          <Box component="span" m={0.5}>
            <Button
              variant="contained"
              color="default"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                return guestSignIn(dispatch, e);
              }}
            >
              ゲスト
              {matches && `サインイン`}
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Home;
