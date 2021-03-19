export type State = {
  user: {
    id: string;
    name: string;
    email: string;
    thumb: string;
  };
  error: {
    isOpened: boolean;
    message: string;
    errorPart: string;
  };
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
