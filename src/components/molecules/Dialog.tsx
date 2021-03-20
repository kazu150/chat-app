import { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NextComponentType } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CommonContext from '../../states/context';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      paddingTop: 24,
    },
    buttons: {
      padding: 24,
    },
  })
);

const FormDialog: NextComponentType = () => {
  const { state, dispatch } = useContext(CommonContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  // context内stateの値をもとに、dialogを開閉
  useEffect(() => {
    if (state.dialog) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [state.dialog]);

  const handleClose = () => {
    dispatch({ type: 'dialogClose' });
  };

  const handleCreateRoom = () => {
    alert(roomTitle, roomDescription);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.title} id="form-dialog-title">
          チャットルームを新規作成
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            チャットルームを新しく作りましょう。あなたが話したいトピックはなんですか？
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={(e) => setRoomTitle(e.target.value)}
            style={{ marginBottom: 16 }}
            label="チャットルーム名"
            placeholder="ネコチャット"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={(e) => setRoomDescription(e.target.value)}
            label="チャットルームの説明"
            placeholder="猫好きが猫を愛でるチャットです。"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button onClick={handleClose} variant="contained" color="default">
            キャンセル
          </Button>
          <Button
            onClick={handleCreateRoom}
            variant="contained"
            color="primary"
          >
            新規登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
