import { createContext } from 'react';

const CommonContext = createContext<ContextType>({
  auth: true,
});

export default CommonContext;
