import { useState, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChatIcon from '@material-ui/icons/Chat';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { NextComponentType } from 'next';
import Router from 'next/router';
import CommonContext from '../../states/context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 350,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const TemporaryDrawer: NextComponentType = () => {
  const { state, dispatch } = useContext(CommonContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (toggle: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(toggle);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          チャットルーム一覧
        </ListSubheader>
        {state.rooms.length ? (
          state.rooms.map((room) => (
            <ListItem
              button
              onClick={() => Router.push(`/chat/${room.id}`)}
              key={room.id}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={room.title} />
            </ListItem>
          ))
        ) : (
          <ListItem key={1}>
            <ListItemText primary="チャットルームはありません" />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={() => dispatch({ type: 'dialogOpen' })}
          button
          key={1}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="チャットルーム作成" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        onClick={toggleDrawer(true)}
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
