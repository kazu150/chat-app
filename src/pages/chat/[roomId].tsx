/* eslint-disable react/jsx-wrap-multilines */
import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Avatar,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
  Box,
} from '@material-ui/core';
import CommonContext from '../../states/context';
import useHandleChatUpdate from '../../hooks/useHandleChatUpdate';
import { Room } from '../../states/initialState';

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
    inline: {
      display: 'inline',
    },
    chatArea: {
      marginBottom: '30px',
    },
  })
);

const Chat: NextPage = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CommonContext);
  const [room, setRoom] = useState<Room>({
    id: '',
    createdAt: '',
    title: '',
    description: '',
  });
  const [
    draft,
    setDraft,
    chats,
    onPostSubmit,
    onDeleteAllClick,
  ] = useHandleChatUpdate(dispatch, state, room?.id);
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    const fetchedRoom = state.rooms.filter((data) => {
      return data.id === roomId;
    })[0];
    // fetchedRoomが確実に取得できるまでsetしない（nullが入るのを防ぐ）
    if (!fetchedRoom) return;
    setRoom(fetchedRoom);
  }, [roomId, state.rooms]);

  return (
    state.user.email && (
      <div>
        <Head>
          <title>{`リアルタイムチャット | ${room.title}`}</title>
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
                fullWidth
                error={state.error.errorPart === 'draft'}
                multiline
                label="投稿内容"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
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
                    <div key={chat.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={chat.name || 'アバター'}
                            src={chat.thumb || '/avatar.png'}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              {chat.name || '　'}
                            </Typography>
                          }
                          secondary={
                            // eslint-disable-next-line react/jsx-wrap-multilines
                            <>
                              <Typography
                                variant="body1"
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {chat.description || '　'}
                              </Typography>
                              <br />
                              <time>{chat.createdAt || '　'}</time>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
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
