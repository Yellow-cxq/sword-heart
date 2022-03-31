import { Children } from 'react';
import loadable from '@loadable/component';
// 异步加载函数，异步地加载 Home 组件
const Home = loadable(
  () => import(/* webpackChunkName: 'page-home' */ '../containers/home/Home'),
);

const routerPath: { [key: string]: any } = {
  index: {
    path: '/index.htm',
    exact: true,
    name: '首页',
    component: Home,
  },
};

export default routerPath;
