import ajax from './ajax';
import { message } from 'antd';
const defaultSuccessFunc = data => {
  message.success(`${data.message}`);
  console.log('data :', data);
};
const defaultFailedFunc = res => {
  message.error(`${res.message}`);
};
const defaultErrorFunc = err => {
  message.error(`${err.message}`);
};
class Server {
  Get(url, data, isShowLoading, success = defaultSuccessFunc, failed = defaultFailedFunc, error = defaultErrorFunc) {
    ajax.defaults.showLoading = isShowLoading;
    ajax
      .get(url, { params: data })
      .catch(err => {
        console.log('catch--error');
        error(err);
      })
      .then(res => {
        console.log(res, 'Server Response --- Get');
        if (!res || res.status !== 200) {
          error(res);
        } else {
          if (res.data.code === 200) {
            success(res.data);
          } else {
            failed(res.data);
          }
        }
      });
  }
  Post(url, data, success = defaultSuccessFunc, isShowLoading, failed = defaultFailedFunc, error = defaultErrorFunc) {
    ajax.defaults.showLoading = isShowLoading;
    console.log(data);
    ajax
      .post(url, data)
      .catch(err => {
        console.log('catch--error');
        error(err);
      })
      .then(res => {
        console.log(res, 'Server Response --- Post');
        if (!res || res.status !== 200) {
          error(res);
        } else {
          if (res.data.code === 200) {
            success(res.data);
          } else {
            failed(res.data);
          }
        }
      });
  }
}
export default Server;
