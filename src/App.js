import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Login } from './login';
import { view as Home } from './pages';
import { connect } from 'react-redux';
import NoMatch from './pages/error/404';
import * as localstorage from './util/localstorage';
const hasToken = localstorage.get('jwt_token');
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return hasToken || rest.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
const LoginWrap = props => {
  return <Login {...props} />;
};
const HocLogin = withRouter(LoginWrap);

const App = props => {
  return (
    <>
      <Loading />
      <Switch>
        <Route path="/" exact render={() => (hasToken ? <Redirect to="/home" /> : <HocLogin />)} />
        <Route path="/login" render={() => (hasToken ? <Redirect to="/home" /> : <HocLogin />)} />
        <PrivateRoute path="/home" isAuthenticated={props.isAuthenticated} component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
};
//
const mapStateToProps = state => {
  return { isAuthenticated: state.login.isAuthenticated };
};

export default withRouter(connect(mapStateToProps)(App));
