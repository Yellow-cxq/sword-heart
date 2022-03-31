import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { Spin } from 'antd';

import 'assets/style/global.less';
import 'assets/style/font.less';

import Index from './containers/index';
import View404 from './containers/others/404/404';
import ViewUnauthorized from './containers/others/unauthorized';
// import Login from './containers/login/Login';

// 公共模块
// const Index = lazy(() => import(/* webpackChunkName: 'index' */ './containers/index'))

// 基础页面
// const View404 = lazy(() => import(/* webpackChunkName: '404' */ './containers/others/404/404'))
// const ViewUnauthorized = lazy(() => import(/* webpackChunkName: '500' */ './containers/others/unauthorized'))
// const Login = lazy(() => import('./containers/login/Login'))

const LoadingNode = (
  <div className="iw_global_loading">
    <Spin tip="Loading.." />
  </div>
);

const App = () => (
  <Router basename="">
    <Suspense fallback={LoadingNode}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/index.htm" />} />
        {/* <Route path="/login.htm" component={Login} /> */}
        <Route path="/unauthorized.htm" component={ViewUnauthorized} />
        <Route path="/404.htm" component={View404} />
        <Route component={Index} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
