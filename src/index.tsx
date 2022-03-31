import React from 'react';
import * as AllReact from 'react';
import ReactDOM from 'react-dom';
import allAntdComponent from 'utils/all_antd';
import { StoreProvider } from 'store/index';
import reportWebVitals from './config/reportWebVitals';
import { ConfigProvider, message } from 'antd';
import ProTable, { EditableProTable } from '@ant-design/pro-table';

import zhCN from 'antd/es/locale/zh_CN';
import App from './App';

// 全局处理错误提示
window.APICONFIG = {
  redirectURL: () => {
    window.location.href = '/login.htm';
  },
  errorMsgCallback: (error) => {
    message.error(error);
  }, // 错误信息方法
};

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);
// 暴露全局变量，为三方js提供访问 react、antd 的能力
window.React = AllReact;
window.antd = allAntdComponent;
window['@ant-design/pro-table'] = ProTable;
window['@ant-design/pro-table']['EditableProTable'] = EditableProTable;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
