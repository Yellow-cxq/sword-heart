import {
  MODIFY_USER_INFO,
  MODIFY_DATASOURCE,
  QUERY_SYSTEM_LIST,
} from './types';

const initialState: any = {
  userInfo: {},
  dataSourceForQuerySQL: {},
  systemList: [],
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any },
) => {
  const { type, payload } = action;
  switch (type) {
    case MODIFY_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...payload,
        },
      };
    case MODIFY_DATASOURCE:
      return {
        ...state,
        dataSourceForQuerySQL: payload,
      };
    case QUERY_SYSTEM_LIST:
      return {
        ...state,
        systemList: payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
