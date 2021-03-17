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
} from '@material-ui/core';
import CommonContext from '../states/context';

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
  })
);

const Chat: NextPage = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CommonContext);
  const [draft, setDraft] = useState('');

  const onPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const y = date.getFullYear();
    const m = `00${date.getMonth() + 1}`.slice(-2);
    const d = `00${date.getDate()}`.slice(-2);
    const h = `00${date.getHours()}`.slice(-2);
    const min = `00${date.getMinutes()}`.slice(-2);

    dispatch({
      type: 'chatPostNew',
      payload: {
        id: Number(date),
        name: state.user.name,
        thumb: state.user.thumb,
        createdAt: `${y}/${m}/${d} ${h}:${min}`,
        description: draft,
      },
    });

    setDraft('');
  };

  useEffect(() => {
    const f = async () => {
      try {
        if (state.user.email) return;
        await Router.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [state.user.email]);

  return (
    state.user.email && (
      <div>
        <Typography variant="h1">チャット</Typography>
        <form onSubmit={onPostSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <TextField
                required
                fullWidth
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
          {state.chats
            .sort((a, b) => b.id - a.id)
            .map((chat) => (
              <div key={chat.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={chat.thumb} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h6">{chat.name}</Typography>}
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
        </List>
      </div>
    )
  );
};

export default Chat;
