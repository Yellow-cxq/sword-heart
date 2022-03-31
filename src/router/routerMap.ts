import RouterPath from './routerPath';
import { IRouterItem } from './interface';

// 路由映射(映射的routerPath)
const routes: IRouterItem[] = [
  {
    path: RouterPath.index.path,
    exact: RouterPath.index.exact,
    component: RouterPath.index.component,
  },
];

export default routes;
