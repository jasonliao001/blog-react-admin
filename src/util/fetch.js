import { message } from 'antd';

const request = (url, config) => {
  return fetch(url, config)
    .then(res => {
      if (!res.ok) {
        // 服务器异常返回
        throw Error('');
      }
      return res.json();
    })
    .then(resJson => {
      if (resJson.code !== 200) {
        message.error(`${resJson.message}`);
      }
      if (resJson.code === 200) {
        message.success(`${resJson.message}`);
        return resJson;
      }
    })
    .catch(err => {
      console.log(err, 'err');
      // 公共错误处理
      message.error('内部错误，请重新登录');
    });
};

// GET请求
export const get = url => {
  return request(url, { method: 'GET' });
};

// POST请求
export const post = (url, data) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  });
};
