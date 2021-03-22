/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  List,
  Typography,
  Box,
} from '@material-ui/core';
import CommonContext from '../../states/context';
import useHandleChatUpdate from '../../hooks/useHandleChatUpdate';
import ChatElement from '../../components/molecules/ChatElement';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginBottom: '30px',
    },
    title: {
      marginBottom: 5,
    },
    description: {
      marginBottom: 18,
      fontSize: 14,
    },
    chatArea: {
      marginBottom: '30px',
    },
  })
);

const Chat: NextPage = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CommonContext);

  const [
    chats,
    onPostSubmit,
    onDeleteAllClick,
    room,
    roomId,
  ] = useHandleChatUpdate(dispatch, state);

  return (
    state.user.email && (
      <div>
        <Head>
          <title>{`ゆるふわちゃっと | ${room.title}`}</title>
        </Head>
        <Typography className={classes.title} variant="h1">
          {room.title}
        </Typography>
        <Typography className={classes.description} variant="body1">
          {room.description}
        </Typography>
        <form onSubmit={onPostSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <TextField
                autoFocus
                fullWidth
                error={state.error.errorPart === 'draft'}
                multiline
                label="投稿内容"
                value={state.drafts[roomId] || ''}
                onChange={(e) =>
                  dispatch({
                    type: 'draftsUpdate',
                    payload: { [roomId]: e.target.value },
                  })
                }
                style={{ marginBottom: 10 }}
                placeholder="投稿を入力しましょう"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" variant="contained" color="primary">
                投稿！
              </Button>
            </Grid>
          </Grid>
        </form>
        <List className={classes.root}>
          {/* チャット履歴があれば履歴の配列を展開して表示 */}
          {chats.length ? (
            <>
              <div className={classes.chatArea}>
                {chats
                  .sort((a, b) => b.id - a.id)
                  .map((chat) => (
                    <ChatElement chat={chat} key={chat.id} />
                  ))}
              </div>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onDeleteAllClick}
                >
                  チャットルームを削除
                </Button>
              </Box>
            </>
          ) : (
            <div>チャット履歴がありません！</div>
          )}
        </List>
      </div>
    )
  );
};

export default Chat;
