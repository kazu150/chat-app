import { useState, useEffect } from 'react';
import { roomTitleMaxLength, roomDescriptionMaxLength } from '../vars';
import { State } from '../states/initialState';
import { Action } from '../states/reducer';
import createRoom from '../firebase/createRoom';

const useHandleDialog = (
  state: State,
  dispatch: React.Dispatch<Action>
): [
  boolean,
  typeof handleClose,
  typeof setRoomTitle,
  typeof setRoomDescription,
  typeof handleCreateRoom
] => {
  const [open, setOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  // context内stateの値をもとに、dialogを開閉
  useEffect(() => {
    if (state.dialog) {
      setOpen(true);
    } else {
      setOpen(false);
      // ダイアログ上の入力情報も初期化
      setRoomTitle('');
      setRoomDescription('');
    }
  }, [state.dialog]);

  const handleClose = () => {
    dispatch({ type: 'dialogClose' });
  };

  const handleCreateRoom = () => {
    // ルーム名が入力されていない場合
    if (!roomTitle) {
      dispatch({ type: 'errorEmptyRoomTitle' });
      return;
    }

    // ルーム名が超過の場合
    if (roomTitle.length > roomTitleMaxLength) {
      dispatch({
        type: 'errorRoomTitleExcessMaxLength',
        payload: roomTitleMaxLength,
      });
      return;
    }

    // ルームの説明が入力されていない場合
    if (!roomDescription) {
      dispatch({ type: 'errorEmptyRoomDescription' });
      return;
    }

    // ルームの説明が超過の場合
    if (roomDescription.length > roomDescriptionMaxLength) {
      dispatch({
        type: 'errorRoomDescriptionExcessMaxLength',
        payload: roomDescriptionMaxLength,
      });
    }

    void createRoom(dispatch, roomTitle, roomDescription);
    handleClose();
  };
  return [
    open,
    handleClose,
    setRoomTitle,
    setRoomDescription,
    handleCreateRoom,
  ];
};

export default useHandleDialog;
