import { createContext } from 'react';
import initialState, { State } from './initialState';
import { Action } from './reducer';

export type ContextType = {
  dispatch: React.Dispatch<Action>;
  state: State;
};

const CommonContext = createContext<ContextType>({
  dispatch: null,
  state: initialState,
});

export default CommonContext;
