/* eslint-disable react/jsx-wrap-multilines */
import {
  Avatar,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import { NextComponentType, NextPageContext } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chat } from '../../firebase/fetchPosts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
    },
    time: {
      marginLeft: 10,
      fontSize: 14,
    },
    listItem: {
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
        paddingLeft: 0,
      },
    },
  })
);

type Props = {
  chat: Chat;
};

const ChatElement: NextComponentType<NextPageContext, unknown, Props> = (
  props
) => {
  const { chat } = props;

  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.listItem} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={chat.name || 'アバター'}
            src={chat.thumb || '/avatar.png'}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography className={classes.inline} variant="h6">
                {chat.name || '　'}
              </Typography>
              <time className={classes.time}>{chat.createdAt || '　'}</time>
            </>
          }
          secondary={
            <Typography variant="body1" component="span" color="textPrimary">
              {chat.description || '　'}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ChatElement;
