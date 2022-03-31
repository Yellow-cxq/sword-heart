import { ReactNode } from 'react';

export interface IConfirmFuncProps {
  okText: string;
  title: string | ReactNode;
  content: string | ReactNode;
  color?: string;
  handleOk: () => void;
}

// 当前登录用户信息
export interface IwUserDTO {
  email: string;
  employeeNature: number;
  gender: number;
  gmtCreate: number;
  gmtModified: number;
  id: number;
  isDelete: number;
  job: string;
  jobNo: string;
  mobile: string;
  nick: string; //	昵称
  pwd: string;
  realName: string; // 真实姓名
  status: number;
  userId: number; //	用户id
  department?: string; //	部门
}
