import {
  MODIFY_USER_INFO,
  MODIFY_DATASOURCE,
  QUERY_SYSTEM_LIST,
} from './types';
import BaseHelper from 'server/index';
import { IUserInfo, SystemListItem } from 'server/index.interface';
import defaultAvatar from 'assets/img/user.png';

export const useActions = (state, dispatch) => {
  return {
    modifyUserInfo: async () => {
      const res = await BaseHelper.handleGetUserInfo<IUserInfo>();
      const { data, success, msg } = res;
      const userInfo = { photo: defaultAvatar, ...data };
      dispatch({
        type: MODIFY_USER_INFO,
        payload: userInfo,
      });

      return userInfo;
    },
    modifyDataSource: async (state) => {
      dispatch({
        type: MODIFY_DATASOURCE,
        payload: state,
      });
    },
    querySystemList: async () => {
      const res = await BaseHelper.handleSystemList<SystemListItem[]>();
      const systemList = res.data;
      dispatch({
        type: QUERY_SYSTEM_LIST,
        payload: systemList,
      });

      return systemList;
    },
  };
};
