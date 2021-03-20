export type Room = {
  id: string;
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
  rooms: Room[];
  dialog: boolean;
  user: User;
  error: Error;
};

const initialState: State = {
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
