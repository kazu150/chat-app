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
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Chat } from '../../firebase/fetchChats';

const useStyles = makeStyles(() =>
  createStyles({
    inline: {
      display: 'inline',
    },
    time: {
      marginLeft: 10,
      fontSize: 14,
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
    </div>
  );
};

export default ChatElement;
