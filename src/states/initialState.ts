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
  user: User;
  error: Error;
};

const initialState: State = {
  user: {
    id: '',
    name: '',
    email: '',
    thumb: 'avatar.png',
  },
  error: {
    isOpened: false,
    message: '',
    errorPart: '',
  },
};

export default initialState;
