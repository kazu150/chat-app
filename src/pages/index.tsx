import { useContext } from 'react';
import Router from 'next/router';
import { Button, Box } from '@material-ui/core';
import CommonContext from '../context';

export default function Home() {
  const { auth } = useContext(CommonContext);
  return (
    <div>
      <h1>リアルタイムチャット</h1>

      <Box textAlign="center">
        <img src="chat.svg" width={350} height={350} />
      </Box>
      {auth ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => Router.push('/chat')}
        >
          チャットへ
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => Router.push('/signup')}
          >
            新規登録
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => Router.push('/signin')}
          >
            サインイン
          </Button>
        </>
      )}
    </div>
  );
}
