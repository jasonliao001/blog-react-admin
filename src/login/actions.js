import loginApi from '../services/modules/login.js';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import * as localstorage from '../util/localstorage';
import setAuthorizationToken from '../util/setAuthorizationToken';
export const setCurrentUser = user => {
  return { type: 'IS_AUTH', user };
};

export const login = (formVal, history) => {
  return dispatch => {
    loginApi.login(formVal, res => {
      const token = res.token;
      dispatch(setCurrentUser(jwtDecode(token)));
      localstorage.put('jwt_token', token);
      setAuthorizationToken(token);
      console.log('history', history);
      message.success(`${res.message}`, 1, () => history.push('/home'));
    });
  };
};
