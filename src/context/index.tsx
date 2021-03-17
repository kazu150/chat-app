import { createContext } from 'react';
import initialState from '../reducer/initialState';

const CommonContext = createContext<ContextType>({
  dispatch: null,
  state: initialState,
});

export default CommonContext;
