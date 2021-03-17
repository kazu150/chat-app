export const reducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { ...state, auth: true };
    case 'signout':
      return { ...state, auth: false };
    case 'toggle':
      return { ...state, auth: !state.auth };
    default:
  }
};
export const Action = {};
