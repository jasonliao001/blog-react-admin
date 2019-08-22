import React, { useState } from 'react';
import { Checkbox, Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import * as loginActions from './actions';
import styles from './login.module.css';
const FormItem = Form.Item;

const LoginPage = ({ login }) => {
  let emailInput = null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emitEmptyEmail = () => {
    emailInput.focus();
    setEmail('');
  };

  const gotoLogin = e => {
    e.preventDefault();
    login({ email, password });
  };

  const emailSuffix = email ? <Icon type="close-circle" onClick={emitEmptyEmail} /> : null;

  return (
    <>
      {/* <div className={styles.header}>
        <div className={styles['header-wrapper']}>
          <header>
            <a href="/">
              <img src={logo} alt="ant design mini" />
              <h2>React Easy Start</h2>
            </a>
            <div className={styles['nav-wrapper']}>
              <nav>
                <ul>
                  <li>
                    <a href="https://zhuanlan.zhihu.com/rr1024" target="_blank" rel="noopener noreferrer">
                      帮助
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/sunnut/react-easy-start" target="_blank" rel="noopener noreferrer">
                      Github
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </div> */}
      <div className={styles.content}>
        <Form onSubmit={gotoLogin} className={styles['login-form']}>
          <h3>欢迎登录</h3>
          <FormItem>
            <Input placeholder="请输入你注册邮箱" prefix={<Icon type="user" />} suffix={emailSuffix} value={email} onChange={e => setEmail(e.target.value)} ref={node => (emailInput = node)} size="large" />
          </FormItem>
          <FormItem>
            <Input type="password" placeholder="请输入" prefix={<Icon type="eye" />} value={password} onChange={e => setPassword(e.target.value)} size="large" />
          </FormItem>
          <FormItem>
            <Checkbox>记住</Checkbox>
            <a className={styles['login-form-forgot']} href="/">
              忘记密码
            </a>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              登录
            </Button>
            <a href="/">注册</a>
          </FormItem>
        </Form>
      </div>
      <div className={styles['footer']}>版权所有 © 翻版必究</div>
    </>
  );
};

const mapDispachToProps = (dispatch, props) => ({
  login: formValue => {
    // 等待
    dispatch(loginActions.login(formValue, props.history));
  }
});

export default connect(
  null,
  mapDispachToProps
)(LoginPage);
