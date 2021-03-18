const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    thumb: 'avatar.png',
  },
  chats: [
    {
      id: 1,
      name: 'クロネコ太郎',
      thumb: 'avatar.png',
      createdAt: '2021/03/17 21:20',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
    {
      id: 2,
      name: 'シロネコ次郎',
      thumb: 'avatar.png',
      createdAt: '2021/03/17 21:30',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
    {
      id: 3,
      name: 'ミケネコ三郎',
      thumb: 'avatar.png',
      createdAt: '2021/03/17 21:40',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
    {
      id: 4,
      name: 'チャトラ四郎',
      thumb: 'avatar.png',
      createdAt: '2021/03/17 21:50',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
  ],
  error: {
    isOpened: false,
    message: '',
    errorPart: '',
  },
};

export type State = typeof initialState;

export default initialState;
