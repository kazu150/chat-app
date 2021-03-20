import { useState, useEffect } from 'react';
import { roomTitleMaxLength, roomDescriptionMaxLength } from '../vars';
import { State } from '../states/initialState';
import { Action } from '../states/reducer';

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
    }
  }, [state.dialog]);

  const handleClose = () => {
    dispatch({ type: 'dialogClose' });
  };

  const handleCreateRoom = () => {
    // ルーム名が入力されていない場合
    if (!roomTitle) dispatch({ type: 'errorEmptyRoomTitle' });

    // ルーム名が超過の場合
    if (roomTitle.length > roomTitleMaxLength) {
      dispatch({
        type: 'errorRoomTitleExcessMaxLength',
        payload: roomTitleMaxLength,
      });
    }

    // ルームの説明が入力されていない場合
    if (!roomDescription) dispatch({ type: 'errorEmptyRoomDescription' });

    // ルームの説明が超過の場合
    if (roomDescription.length > roomDescriptionMaxLength) {
      dispatch({
        type: 'errorRoomDescriptionExcessMaxLength',
        payload: roomDescriptionMaxLength,
      });
    }
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
