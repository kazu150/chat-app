export type Room = {
  id: string;
  description: string;
  createdAt: string;
  title: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  thumb: string;
};

export type Error = {
  isOpened: boolean;
  message: string;
  errorPart: string;
};

export type State = {
  currentRoom: string;
  rooms: Room[];
  dialog: boolean;
  user: User;
  error: Error;
};

const initialState: State = {
  currentRoom: '',
  rooms: [],
  dialog: false,
  user: {
    id: '',
    name: '',
    email: '',
    thumb: '',
  },
  error: {
    isOpened: false,
    message: '',
    errorPart: '',
  },
};

export default initialState;
