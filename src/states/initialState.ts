const initialState = {
  auth: true,
  user: {
    name: '',
    email: '',
    thumb: '',
  },
  chat: [
    {
      name: 'クロネコ太郎',
      thumb: 'avatar.png',
      date: '2021/03/17 21:40',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
    {
      name: 'シロネコ次郎',
      thumb: 'avatar.png',
      date: '2021/03/17 21:40',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
    {
      name: 'ミケネコ三郎',
      thumb: 'avatar.png',
      date: '2021/03/17 21:40',
      description:
        '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
    },
    {
      name: 'チャトラ四郎',
      thumb: 'avatar.png',
      date: '2021/03/17 21:40',
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
