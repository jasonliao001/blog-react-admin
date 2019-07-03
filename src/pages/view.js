import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { view as Header } from '../components/header';
import { view as Sidebar } from '../components/sidebar';
import { view as Useradmin } from './useradmin';
import { view as Categories } from './categories';
import { view as Archives } from './archives';
import { view as Tags } from './tags';
import { view as Accountcenter } from './account/center';
import { view as Accountsetting } from './account/setting';
import styles from './home.module.css';

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const sidebarStyle = {
    flex: '0 0 ' + sidebarWidth + 'px',
    width: sidebarWidth + 'px'
  };

  return (
    <div className="ant-layout ant-layout-has-sider">
      <div style={sidebarStyle} className="ant-layout-sider ant-layout-sider-dark">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className={`${styles['content-wrapper']} ant-layout`}>
        <div className={`${styles.header} ant-layout-header`}>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        <div className={`${styles.content} ant-layout-content`}>
          <Route path="/home/useradmin" component={Useradmin} />
          <Route path="/home/categories" component={Categories} />
          <Route path="/home/archives" component={Archives} />
          <Route path="/home/tags" component={Tags} />
          <Route path="/home/accountcenter" component={Accountcenter} />
          <Route path="/home/accountsetting" component={Accountsetting} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
