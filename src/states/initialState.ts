export type State = {
  user: {
    id: string;
    name: string;
    email: string;
    thumb: string;
  };
  chats: {
    id: number;
    name: string;
    thumb: string;
    createdAt: string;
    description: string;
  }[];
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
  chats: [],
  error: {
    isOpened: false,
    message: '',
    errorPart: '',
  },
};

export default initialState;
