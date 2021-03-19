import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
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
import CommonContext from '../states/context';
import { db, firebase } from '../../firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginBottom: '30px',
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
  const [draft, setDraft] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // 各ユーザーの情報を取得
        const usersOnDb = await db.collection('publicProfiles').get();
        const usersArray = usersOnDb.docs.map((user) => ({
          id: user.id,
          ...user.data(),
        }));
        console.log(usersArray);

        // リアルタイムでの更新
        db.collection('chats').onSnapshot((snapshot) => {
          console.log(snapshot.docs[0].data());
          const formedSnapshot = snapshot.docs.map((doc) => {
            const filteredUser = usersArray.filter(
              (user) => user.id === doc.data().publicProfiles.id
            )[0];
            console.log(filteredUser);

            return {
              id: Number(doc.id),
              name: filteredUser.name,
              thumb: filteredUser.thumb,
              createdAt: doc.data().createdAt.toDate().toString(),
              description: doc.data().description,
            };
          });

          dispatch({ type: 'chatSetAll', payload: formedSnapshot });
        });

        // // const formedChats = chats.docs.map(async (chat) => {
        // //   const profile = await db
        // //     .doc(`publicProfiles/${chat.data().publicProfiles.id}`)
        // //     .get();
        //   return {
        //     id: Number(chat.id),
        //     name: profile.data().name,
        //     thumb: profile.data().thumb,
        //     createdAt: chat.data().createdAt.toDate(),
        //     description: chat.data().description,
        //   };
        // });
        // console.log(formedChats);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const chats = await db.collection('chats').get();

  //     const formedChats = chats.docs.map(async (chat) => {
  //       const profile = await db
  //         .doc(`publicProfiles/${chat.data().publicProfiles.id}`)
  //         .get();

  //       return {
  //         id: chat.id,
  //         name: profile.data().name,
  //         thumb: profile.data().thumb,
  //         createdAt: chat.data().createdAt.toDate(),
  //         description: chat.data().description,
  //       };
  //     });

  //     dispatch({ type: 'chatSetAll', payload: formedChats });
  //   })();
  // }, []);

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const y = date.getFullYear();
    const m = `00${date.getMonth() + 1}`.slice(-2);
    const d = `00${date.getDate()}`.slice(-2);
    const h = `00${date.getHours()}`.slice(-2);
    const min = `00${date.getMinutes()}`.slice(-2);
    const idGeneratedFromDate = Number(date);

    // 投稿内容は入力されているか
    if (draft === '') {
      dispatch({ type: 'errorEmptyDraft' });
      return;
    }

    try {
      await db
        .collection('chats')
        .doc(idGeneratedFromDate.toString())
        .set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          publicProfiles: db.doc(`publicProfiles/${state.user.id}`),
          description: draft,
        });

      setDraft('');
    } catch (error) {
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on chat-onPostSubmit]`,
      });
    }
  };

  const onDeleteAllClick = async () => {
    const agreed = window.confirm('本当にすべてのチャット履歴を削除しますか？');
    if (!agreed) return;

    try {
      await db
        .collection('chats')
        .doc()
        .set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          publicProfiles: db.doc(`publicProfiles/${state.user.id}`),
          description: draft,
        });

      dispatch({ type: 'chatDeleteAll' });
      setDraft('');
    } catch (error) {
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on chat-onDeleteAllClick]`,
      });
    }
  };

  return (
    state.user.email && (
      <div>
        <Typography variant="h1">チャット</Typography>
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
          {state.chats.length ? (
            <>
              <div className={classes.chatArea}>
                {state.chats
                  .sort((a, b) => b.id - a.id)
                  .map((chat) => (
                    <div key={chat.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={chat.thumb} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6">{chat.name}</Typography>
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
                                {chat.description}
                              </Typography>
                              <br />
                              <time>{chat.createdAt}</time>
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
                  すべてのチャットを削除
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
