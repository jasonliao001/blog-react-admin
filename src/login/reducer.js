const initialState = {
  isAuthenticated: false,
  user: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return {
        isAuthenticated: action.user && Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;
  }
};
