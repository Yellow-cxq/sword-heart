import React, { useEffect, useMemo, useState } from 'react';
import { Menu, Dropdown, Space, Avatar, Badge } from 'antd';
import { AlertOutlined, ApiOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import CustomBreadcrumb from '../customBreadcrumb/CustomBreadcrumb';
import { genBreadcrumbData } from 'utils/routerUtil';
import { IUserInfo } from 'server/index.interface';
import { routerListParams } from 'router/interface';

import './style.less';

interface IProps {
  userInfo: IUserInfo;
  loginOut: () => void;
  setting: () => void;
  routerList: routerListParams[];
}

const NavHeader = (props: IProps) => {
  let {
    userInfo: { photo, nick },
    loginOut,
    setting,
    routerList,
  } = props;
  const [breadcrumbData, setBreadcrumbData] = useState<string[]>([]);
  const location = useLocation();
  useEffect(() => {
    const data = genBreadcrumbData(location.pathname);
    setBreadcrumbData(data.map((item) => item.name));
    return () => {};
  }, [location, routerList]);

  const handleFindPathName = () => {
    const { pathname } = location;
    const pathnameArr = pathname
      .split('/')
      .filter(Boolean)
      .map((itm) => `/${itm}`);
    let newList = JSON.parse(JSON.stringify(routerList)),
      name = '';
    pathnameArr.forEach((itm, index) => {
      /** 处理有的远程菜单path为多层 */
      const itmPath = pathnameArr.slice(0, index + 1).join('');
      const list = newList.filter(
        (obj) => obj.path === itm || obj.path === itmPath,
      );
      /**
       * 菜单第二层为children下，菜单名为menuName 例如 数据开发 -> 表订正
       * 菜单第三层为routes，菜单名为name  例如 权限管理 -> 我的权限 -> 已获得权限
       */
      const childrenList = list[0]?.children || list[0]?.routes || [];
      if (!childrenList.length) {
        const nameObj = newList.find(
          (obj) => obj.path === itmPath || obj.path === itm,
        );
        const menuName = nameObj?.name || nameObj?.menuName || '';
        if (menuName) {
          name = menuName;
        }
      }
      newList = childrenList;
    });
    return name;
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="用户设置">
        <Menu.Divider />
        <Menu.Item key="0">
          <span onClick={setting}>
            <AlertOutlined />
            基本设置
          </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <span onClick={loginOut}>
            <ApiOutlined />
            退出登录
          </span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const menuName = useMemo(() => handleFindPathName(), [location, routerList]);
  return (
    <div className="iw_wrap_header">
      {/* <CustomBreadcrumb arr={breadcrumbData} /> */}
      <CustomBreadcrumb arr={menuName ? [menuName] : breadcrumbData} />
      <div className="right">
        <Dropdown overlay={menu} trigger={['hover', 'click']}>
          <div className="ant-dropdown-link">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} src={photo} alt="avatar" />
              <span>{nick}</span>
            </Space>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default React.memo(NavHeader);
