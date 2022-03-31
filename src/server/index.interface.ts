// import { InterfaceResponse } from '@yunti-private/yt-frontend-api';
// 所有接口返回的格式
export interface InterfaceResponse<T = any> {
  success: boolean;
  data: T;
  msg?: string;
  encrypted?: boolean;
  encryptedData?: string;
}
export interface CommonHelperDTO {
  handleGetUserInfo: <T>() => Promise<InterfaceResponse<T>>;
  handleSystemList: <T>() => Promise<InterfaceResponse<T>>;
  handleGetComponent: (page: string) => Promise<InterfaceResponse<IPageInfo>>;
  handleGetSysInfo: <T>() => Promise<InterfaceResponse<T>>;
}

export interface IPageInfo {
  childPageList: IPageItem[];
  layoutType: number;
}
export interface IPageItem {
  content?: string;
  moduleCode?: string;
  type: number;
  pageUrl?: string;
}

export interface IUserInfo {
  anyMouse?: boolean;
  balance?: number;
  name?: string;
  nick?: string;
  sessionId?: string;
  photo?: string;
  status?: number;
  type?: number;
  userId?: number;
}
export interface SystemListItem {
  code: string;
  companyCode: string;
  companyName: string;
  envConf: string;
  gmtCreate: number;
  gmtModified: number;
  id: number;
  name: string;
  status: number;
  token: string;
  type: number;
  webhook: string;
}

export interface SystemInfo {
  sysName: string;
  description?: string;
}
