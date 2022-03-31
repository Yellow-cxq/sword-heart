import routes from 'src/router/routerMap';
import RouterPath from 'src/router/routerPath';

interface RouterItem {
  exact?: boolean;
  path: string;
  component?: string;
  name?: string;
  redirect?: string;
  routes?: RouterItem[];
}
// 获取当前menu的key
export const getCurrentMenuKey = (pathname: string) => {
  let key = '';
  const findKey = (routeList: RouterItem[]) => {
    for (const rc of routeList) {
      if (rc.path === pathname) {
        key = rc.path;
        break;
      } else if (rc.redirect && rc.redirect === pathname) {
        key = rc.redirect;
        break;
      } else if (rc.routes) {
        findKey(rc.routes);
      }
    }
  };

  findKey(routes);
  console.log('key', key);
  return key;
};

interface BreadcrumbData {
  name: string;
  path: string;
}
/**
 * @description: 生成 面包屑data
 * @param {*string} pathname
 * @return {*}
 */
export const genBreadcrumbData = (pathname: string) => {
  const originPaths = pathname.split('/').filter((p: string) => !!p); // 根据路由拆分
  // console.log('originPaths :>> ', originPaths)

  //根据路由组合成对应的path
  const combinationPaths = originPaths.map((p: string, idx: number) => {
    const needCombinationPaths = originPaths.slice(0, idx + 1);
    const combinationPath = needCombinationPaths.reduce(
      (pre: string, cur: string) => {
        pre += '/' + cur;
        return pre;
      },
      '',
    );
    return combinationPath;
  });
  // console.log('combinationPaths :>> ', combinationPaths)

  let breadcrumbData: BreadcrumbData[] = [];

  // 根据path 生成 面包屑item
  const findTrueRoute = (routeList: RouterItem[], pathname: string) => {
    for (const rc of routeList) {
      if (pathname === rc.path && !rc.redirect) {
        breadcrumbData.push({
          name: rc.name || '',
          path: rc.path,
        });
        break;
      } else if (rc.routes) {
        findTrueRoute(rc.routes, pathname);
      }
    }
  };

  // 根据路由 查找name
  const findRouteName = (routerPath: any, oIndex: number, pIndex: number) => {
    let routeName = '';
    const pathname = excludeRolePaths[pIndex];
    let module = originPaths[oIndex];
    const htmIndex = module.indexOf('.htm');
    if (htmIndex > -1) {
      module = module.substr(0, htmIndex);
    }
    const moduleRouter = routerPath[module];
    if (moduleRouter && moduleRouter.path === pathname) {
      routeName = moduleRouter.name;
    } else if (moduleRouter && moduleRouter.children) {
      const newPIndex = pIndex + 1;
      let newModule = originPaths[newPIndex];
      if (newModule) {
        routeName = findRouteName(moduleRouter.children, oIndex + 1, pIndex);
      }
    }
    return routeName;
  };

  combinationPaths.forEach((ele: string, idx: number) => {
    findTrueRoute(routes, ele);
  });

  const excludeRolePaths = combinationPaths.slice(1);
  const roleRouterPath = RouterPath;
  const oIndex = 0;

  excludeRolePaths.forEach((ele: string, idx: number) => {
    const routeName = findRouteName(roleRouterPath, oIndex, idx);
    if (routeName) {
      breadcrumbData.map((item) => {
        if (item.path === ele) {
          item.name = routeName;
        }
        return item;
      });
    }
  });
  breadcrumbData = breadcrumbData.filter((item) => !!item.name);
  //
  if (breadcrumbData.length > 0) {
    breadcrumbData[0].path = '';
    breadcrumbData[breadcrumbData.length - 1].path = '';
  }

  // console.log('breadcrumbData :>> ', breadcrumbData)
  return breadcrumbData;
};
