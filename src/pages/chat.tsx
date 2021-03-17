import { useContext, useEffect } from 'react';
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
import CommonContext from '../context';

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

  const { auth } = useContext<>(CommonContext);
  const onPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('done');
  };

  useEffect(() => {
    !auth && Router.push('/');
  }, [auth]);

  return (
    auth && (
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
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="avatar.png" />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">クロネコ太郎</Typography>}
              secondary={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <>
                  <Typography
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                  </Typography>
                  <br />
                  <time>2021/03/17 21:40</time>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="avatar.png" />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">クロネコ太郎</Typography>}
              secondary={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <>
                  <Typography
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                  </Typography>
                  <br />
                  <time>2021/03/17 21:40</time>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="avatar.png" />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">クロネコ太郎</Typography>}
              secondary={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <>
                  <Typography
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                  </Typography>
                  <br />
                  <time>2021/03/17 21:40</time>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="avatar.png" />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">クロネコ太郎</Typography>}
              secondary={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <>
                  <Typography
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                  </Typography>
                  <br />
                  <time>2021/03/17 21:40</time>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </div>
    )
  );
};

export default Chat;
