import { useContext } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { Button, Box, Typography } from '@material-ui/core';
import CommonContext from '../states/context';
import guestSignIn from '../firebase/guestSignIn';

const Home: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);

  return (
    <div>
      <Head>
        <title>リアルタイムチャット | Home</title>
      </Head>
      <Typography variant="h1">リアルタイムチャット</Typography>
      <Box textAlign="center">
        <img src="chat.svg" alt="アバター" width={350} height={350} />
      </Box>
      {state.user.email ? (
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => Router.push('/chat')}
          >
            チャットへ
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <Box component="span" m={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Router.push('/signup')}
            >
              新規登録
            </Button>
          </Box>
          <Box component="span" m={1}>
            <Button
              variant="contained"
              color="default"
              onClick={() => Router.push('/signin')}
            >
              サインイン
            </Button>
          </Box>
          <Box component="span" m={1}>
            <Button
              variant="contained"
              color="default"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                return guestSignIn(dispatch, e);
              }}
            >
              ゲストサインイン
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Home;
