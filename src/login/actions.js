import loginApi from '../services/modules/login.js';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import * as localstorage from '../util/localstorage';
import setAuthorizationToken from '../util/setAuthorizationToken';
import history from '../util/history';
export const setCurrentUser = user => {
  return { type: 'IS_AUTH', user };
};
export const logout = () => {
  return dispatch => {
    localstorage.remove('jwt_token');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    message.success(`登出成功`, 1, () => history.push('/login'));
  };
};
export const login = (formVal, history) => {
  return dispatch => {
    loginApi.login(formVal, res => {
      const token = res.token;
      dispatch(setCurrentUser(jwtDecode(token)));
      localstorage.put('jwt_token', token);
      setAuthorizationToken(token);
      message.success(`${res.message}`, 1, () => history.push('/home'));
    });
  };
};
