import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import {
  withRouter,
  useHistory,
  RouteComponentProps,
  Link,
  useLocation,
} from 'react-router-dom';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import { Input } from 'antd';
// import { isMobileBrowser } from '@yunti-private/tools';
import { NavHeader } from './components';
import IndexRouter from 'router/index';
import { IconMap } from './utils/data';
import RouterPath from 'router/routerPath';
import loginLogo from 'assets/img/loginLogo.png';
// import IndexHelper from './network';
// import { StoreContext } from 'store/index';
import { routerListParams } from 'router/interface';
// import { SystemInfo } from 'server/index.interface';
// import { getSysInfo } from 'utils/fnUtil';

import { menu } from './mockData'; // 写死的菜单数据(应该是从后台拿的)

import './style.less';

interface IProps extends RouteComponentProps {}

const Index: React.FC<IProps> = () => {
  // const { state, dispatch, actions } = useContext(StoreContext); 用户信息，暂未接入

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState('');
  const [hasMenu, setHasMenu] = useState<boolean>(false); // 无菜单时隐藏骨架屏
  const [routerList, setRouterList] = useState<routerListParams[]>([]);
  // const [sysInfo, setSysInfo] = useState<SystemInfo>({
  //   sysName: '',
  //   description: '',
  // }); 系统信息，暂未接入
  // const { userInfo = {} } = state;
  const userInfo = {
    anyMouse: true,
    balance: 2,
    name: '剑心',
    nick: '剑心',
    sessionId: '123456',
    photo: '17398890700',
    status: 1,
    type: 1,
    userId: 1
  } // 用户信息-我TM直接写死
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // handleIsLogin();
    // handleGetSysInfo();
    // if (isMobileBrowser()) {
    //   setCollapsed(true);
    // }
    return () => {};
  }, []);

  // 获取系统名称
  // const handleGetSysInfo = async () => {
  //   const sysInfo = await getSysInfo();
  //   setSysInfo(sysInfo);
  // };

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  // const handleIsLogin = async () => {
  //   if (!localStorage.getItem('user')) {
  //     history.push('/login.htm');
  //   }
  //   await actions.modifyUserInfo();
  //   await actions.querySystemList();
  //   localStorage.setItem('user', JSON.stringify(userInfo));
  // };

  const handleLoginOut = async () => {
    console.log('用户登出');
    // const res = await IndexHelper.handleLogout();
    // const { data, success, msg } = res;
    // if (success && data) {
    //   localStorage.clear();
    //   history.push('/login.htm');
    //   message.success('登出成功!');
    // } else {
    //   message.success(msg, 2);
    //   return;
    // }
  };

  const handleSetting = () => {
    console.log('跳转至设置页');
    // history.push({
    //   pathname: RouterPath.setting.path,
    // });
  };

  const handleRenderMenuItem = (item: MenuDataItem, dom: ReactNode) => {
    if (item.path) {
      return <Link to={item.path}> {dom}</Link>;
    }
    return <div>{dom} </div>;
  };

  const checkUrl = (url) => {
    const re =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return re.test(url);
  };

  const handleGetMenuList = async () => {
    // const res = await IndexHelper.handleGetMenu<any[]>();
    // const { data, success, msg } = res;
    const success = true, data = menu;
    return new Promise<MenuDataItem[]>((resolve) => {
      if (success && data) {
        setRouterList(data as any);
        const formatMenuData = (list, pPath) => {
          const newList = list.map((element) => {
            const {
              icon,
              path,
              pageLink,
              isIncludeSubmenu,
              menuName,
              children = [],
            } = element;
            const RenderIcon: ReactNode = checkUrl(icon) ? (
              <img className="iwork_menu_icon" src={icon} />
            ) : (
              IconMap[icon]
            );
            let tempPath = path || (!isIncludeSubmenu && pageLink);

            if (children && children.length > 0) {
              element.children = children.map((item) => {
                const {
                  icon,
                  path,
                  menuName,
                  pageLink,
                  isIncludeSubmenu,
                  children = [],
                } = item;
                const RenderSonIcon: ReactNode = checkUrl(icon) ? (
                  <img className="iwork_menu_icon" src={icon} />
                ) : (
                  IconMap[icon]
                );
                let tempSonPath = path || (!isIncludeSubmenu && pageLink);

                return {
                  path: element.path + tempSonPath,
                  name: menuName,
                  icon: icon && RenderSonIcon,
                  children: formatMenuData(children, element.path + path),
                };
              });
              return {
                path: tempPath,
                name: menuName,
                icon: icon && RenderIcon,
                children: element.children,
              };
            } else {
              return {
                path: pPath + path,
                name: menuName,
                icon: icon && RenderIcon,
              };
            }
          });
          return newList;
        };
        setHasMenu(true);
        resolve(formatMenuData(data, ''));
      }
    });
  };

  const handleRenderRightContent = () => {
    return (
      <NavHeader
        userInfo={userInfo}
        loginOut={handleLoginOut}
        setting={handleSetting}
        routerList={routerList}
      />
    );
  };

  const filterByMenuDate = (
    data: MenuDataItem[],
    keyWord: string,
  ): MenuDataItem[] =>
    data
      .map((item) => {
        if (
          (item.name && item.name.includes(keyWord)) ||
          filterByMenuDate(item.routes || [], keyWord).length > 0
        ) {
          return {
            ...item,
            routes: filterByMenuDate(item.routes || [], keyWord),
          };
        }

        return undefined;
      })
      .filter((item) => item) as MenuDataItem[];

  return (
    <ProLayout
      style={{ height: '100vh' }}
      className={hasMenu ? '' : 'iwork_menu'}
      collapsed={collapsed}
      disableMobile
      fixSiderbar
      menu={{
        request: async () => {
          const customMenuData = await handleGetMenuList();
          return customMenuData;
        },
      }}
      menuExtraRender={({ collapsed }) =>
        !collapsed && (
          <Input.Search
            defaultValue={keyWord}
            onSearch={(e) => {
              setKeyWord(e);
            }}
          />
        )
      }
      logo={loginLogo}
      postMenuData={(menus) => filterByMenuDate(menus || [], keyWord)}
      siderWidth={150}
      // title='iWork'
      title={'系统名称'}
      fixedHeader
      onMenuHeaderClick={() => history.push('/index.htm')}
      onCollapse={handleToggle}
      menuItemRender={handleRenderMenuItem}
      headerRender={handleRenderRightContent}
      waterMarkProps={{
        content: 'iWork',
        fontColor: 'rgba(0,0,0,.15)',
        fontSize: '16',
        zIndex: 9,
        rotate: -22,
      }}
      contentStyle={{
        margin: '8px',
        overflow: 'auto',
        flex: 1,
      }}
    >
      <div
        className="iw_site_background"
        style={{ minWidth: 1200 - (!collapsed ? 150 : 48) }}
      >
        <IndexRouter />
      </div>
    </ProLayout>
  );
};

export default withRouter(Index);
