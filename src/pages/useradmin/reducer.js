// import { HIDE_LOADING, SHOW_LOADING } from './actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case 'Add_RowData':
      return [
        ...state,
        {
          username: action.username,
          phone: action.phone,
          email: action.email,
          key: action.key
        }
      ];
    case 'Update_RowData':
      console.log('UpdateRowData');
      Object.assign(state[action.i], {
        username: action.username,
        phone: action.phone,
        email: action.email,
        key: action.key
      });
      return [...state];
    case 'Delete_RowData':
      state.splice(action.i, 1);
      return [...state];
    default:
      return state;
  }
};
