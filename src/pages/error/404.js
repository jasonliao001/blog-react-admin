import React, { Component } from 'react';
import styles from './error.module.css';
import { Link } from 'react-router-dom';
export default class NoMatch extends Component {
  render() {
    return (
      <div className={styles.redcolor}>
        <p>404</p>
        <p>该页面不存在</p>
        <Link to="/login">跳转到首页</Link>
      </div>
    );
  }
}
