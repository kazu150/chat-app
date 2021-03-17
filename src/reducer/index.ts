import { State } from './initialState';

export type Action = {
  type: string;
  payload?: unknown;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'signin':
      return { ...state, auth: true };
    case 'signout':
      return { ...state, auth: false };
    case 'toggle':
      return { ...state, auth: !state.auth };
    default:
      return state;
  }
};
