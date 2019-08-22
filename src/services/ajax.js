import axios from 'axios';
import * as LocalStorage from '../util/localstorage';
import store from '../Store';
import { actions as loadingActions } from '../components/loading/index';
// 实例化
const ajax = axios.create({
  baseURL: '/',
  // transformRequest: [
  //   function(data, headers) {
  //     return data;
  //   }
  // ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [
  //   function(data) {
  //     // 对 data 进行任意转换处理
  //     return data;
  //   }
  // ],
  // `headers` 是即将被发送的自定义请求头
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 10000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // responseType: 'json', // default
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function(progressEvent) {
    // Do whatever you want with the native progress event
  },
  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function(progressEvent) {
    // 对原生进度事件的处理
  },
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  }
});

ajax.interceptors.request.use(
  request => {
    store.dispatch(loadingActions.showLoading());
    // const jwt_token = LocalStorage.get('jwt_token');
    // if (jwt_token) {
    //   request.headers['Authorization'] = `Bearer ${jwt_token}`;
    // }
    console.log('interceptors request:', request);
    return request;
  },
  error => {
    console.log('ajax ---  error --- request', error);
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  response => {
    store.dispatch(loadingActions.hideLoading());
    console.log('reponse', response);
    let result = response.data;
    if (response.data.token) {
      LocalStorage.put('jwt_token', response.data.token);
    }
    if (response.status !== 200) {
      // return Promise.reject(result);
    }
    return response;
  },
  error => {
    store.dispatch(loadingActions.hideLoading());
    // 401 重新登陆
    if (error.code === 401) {
      localStorage.remove('jwt_token');
    }
    console.log('ajax ---  error --- response', error);
    return Promise.reject(error);
  }
);

export default ajax;
