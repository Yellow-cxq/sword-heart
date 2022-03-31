// 定义路由的数据结构
export interface IRoute {
  path: string;
  exact: boolean;
  name: string;
  component?: keyof JSX.IntrinsicElements | any;
  routes?: IRoute[];
  children?: { [key: string]: IRoute };
}
export interface ISubMenu {
  name: string;
  path: string;
  icon: string;
  exact: boolean;
  children?: ISubMenu[];
}
export interface IMenu {
  path: string;
  name: string;
  icon: string;
  auth?: number[];
  children?: ISubMenu[];
}

export interface IRouterItem {
  exact?: boolean;
  path: string;
  component?: keyof JSX.IntrinsicElements | any;
  name?: string;
  redirect?: string;
  routes?: IRouterItem[];
}

export interface routerListParams {
  name: string;
  path: string;
  children: routerListParams[];
}
