import initialState, { State, User, Room } from './initialState';

export type Action = {
  type: string;
  payload?: unknown;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // roomsReducer
    case 'roomsFetch':
      return {
        ...state,
        rooms: action.payload as Room[],
      };
    // dialogReducer
    case 'dialogOpen':
      return {
        ...state,
        dialog: true,
      };
    case 'dialogClose':
      return {
        ...state,
        dialog: false,
      };
    // userReducer
    case 'userSignUp':
      return {
        ...state,
        user: {
          ...state.user,
          ...(action.payload as User),
        },
      };
    case 'userSignIn':
      return {
        ...state,
        user: {
          ...state.user,
          ...(action.payload as User),
        },
      };
    case 'userUpdate':
      return {
        ...state,
        user: {
          ...state.user,
          ...(action.payload as User),
        },
      };
    case 'userSignOut':
      return initialState;
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
          errorPart: 'pwConfirm',
          message: '確認用パスワードが一致しません',
        },
      };
    case 'errorWrongPassword':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'pwConfirm',
          message: '入力されたパスワードが間違っています',
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
    case 'errorUserNotFound':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'password',
          message: 'このメールアドレスは登録されていません',
        },
      };
    case 'errorEmptyName':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'name',
          message: 'ユーザー名を入力してください',
        },
      };
    case 'errorEmailAlreadyInUse':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'email',
          message: 'そのメールアドレスは既に使われています',
        },
      };
    case 'errorEmptyDraft':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: 'draft',
          message: '投稿内容を入力してください',
        },
      };
    case 'errorTooBigImageSize':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: '',
          message: `ファイルの上限サイズ${
            (action.payload as number) / 1000000
          }MBを超えています`,
        },
      };
    case 'errorInvalidImageFiles':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: '',
          message: 'JPG/GIF/PNG画像ファイル以外は登録できません',
        },
      };
    case 'errorExcessMaxLength':
      return {
        ...state,
        error: {
          isOpened: true,
          errorPart: '',
          message: `${action.payload as number}文字以内で入力してください`,
        },
      };
    case 'errorOther':
      return {
        ...state,
        error: {
          isOpened: true,
          message: action.payload as string,
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
