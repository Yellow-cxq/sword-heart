import { CommonHelperDTO } from './index.interface';
import { getBaseUrl } from 'utils/introduction';
const IW_HOST = getBaseUrl();

const BaseHelper: CommonHelperDTO = {
  // 没得接口调，写个架架
  handleGetUserInfo: () => new Promise(() => {}),
  handleSystemList: () => new Promise(() => {}),

  handleGetComponent: (page) => new Promise(() => {}),

  handleGetSysInfo: () => new Promise(() => {}),
};

export default BaseHelper;
