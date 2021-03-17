import initialState, { State } from './initialState';

export type Action = {
  type: string;
  payload?: unknown;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // userReducer
    case 'userSignUp':
      return {
        ...state,
        user: action.payload,
      };
    case 'userSignIn':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'userModProfile':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'userSignOut':
      return {
        ...state,
        user: initialState.user,
      };
    // chatReducer
    case 'chatLoadAll':
      return {
        ...state,
        chat: action.payload,
      };
    case 'chatLoadNew':
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    case 'chatPostNew':
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    // errorReducer
    case 'errorEmptyMail':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'email',
          message: 'メールアドレスが未入力です',
        },
      };
    case 'errorEmptyPassword':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'password',
          message: 'パスワードが未入力です',
        },
      };
    case 'errorUnmatchPassword':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'passwordConfirm',
          message: 'パスワードが一致しません',
        },
      };
    case 'errorInvalidEmail':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'email',
          message: '有効なメールアドレスを入力してください',
        },
      };
    case 'errorInvalidPassword':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'password',
          message:
            'パスワードは半角英数字の組み合わせ8-15文字で入力してください',
        },
      };
    case 'errorUnregisteredPassword':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'password',
          message: 'このメールアドレスは登録されていません',
        },
      };
    case 'errorEmptyname':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'name',
          message: 'ユーザー名を入力してください',
        },
      };
    case 'errorInvalidInitialTime':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'initialTime',
          message: '正しい学習時間を入力してください',
        },
      };
    case 'errorOther':
      return {
        ...state,
        error: {
          isOpened: true,
          message: action.payload,
          errorPart: '',
        },
      };
    case 'errorClose':
      return {
        ...state,
        error: {
          isOpened: false,
          message: '',
          errorPart: '',
        },
      };
    default:
      return state;
  }
};
