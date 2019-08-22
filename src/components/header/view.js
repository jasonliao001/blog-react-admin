import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as LocalStorage from '../../util/localstorage';
import styles from './header.module.css';
import * as loginActions from '../../login/actions';

// 登出操作
const Header = ({ collapsed, setCollapsed, logout }) => {
  const handleClickMenuItem = e => {
    switch (e.key) {
      case '2':
        logout();
        break;
    }
  };
  const menu = (
    <Menu onClick={handleClickMenuItem}>
      <Menu.Item key="1">
        <Link to="/home/setting">
          <Icon type="setting" />
          &nbsp;偏好设置
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link to="/login">
          <Icon type="poweroff" />
          &nbsp;退出登录
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles['header-wrapper']}>
      <span className={styles['header-collapsed']} onClick={() => setCollapsed(!collapsed)}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <div className={styles['header-user-info']}>
        <Dropdown overlay={menu} placement="bottomRight">
          <span className={styles['header-dropdown-link']}>
            <Icon type="user" /> {LocalStorage.get('TA-username')} <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};
const mapDispachToProps = (dispatch, props) => ({
  logout: () => {
    // 等待
    dispatch(loginActions.logout());
  }
});

export default connect(
  null,
  mapDispachToProps
)(Header);
