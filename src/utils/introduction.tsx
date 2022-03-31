// 表视图函数封装-暂不使用
import { cloneDeep } from 'lodash';
import queryString from 'query-string';
import axios from 'axios';
import { message } from 'antd';
const IW_HOST = getBaseUrl();

export function isLocalHOST() {
  const PRODUCTION = window.location.host;
  const isDP =
    !!~PRODUCTION.indexOf('localhost') ||
    !!~PRODUCTION.indexOf('127.0.0.1') ||
    !!~PRODUCTION.indexOf('test-daily'); // 判断是否本地测试环境
  return isDP;
}

export function getBaseUrl(project = 'sword-heart') {
  let defaultHostName = '.bookln.cn';
  const host = window.location.host;
  // 获取项目名+环境
  const currentDomains = host.split('.');
  const currentProjects = currentDomains[0].split('-');
  const env = currentProjects.length === 2 ? currentProjects[1] : '';
  const pro = currentProjects.length > 0 ? currentProjects[0] : '';
  // 获取host名
  const reg = /(?:\.[^.]+){2}$/;
  const res = host.match(reg);
  let hostname = res ? res[0] : defaultHostName;
  let projectWithEnv = (pro || project) + (env === '' ? '' : `-${env}`);

  if (isLocalHOST()) {
    projectWithEnv = (project || pro) + '-daily';
    hostname = defaultHostName;
  }

  return `https://${projectWithEnv}${hostname}`;
}
/**
 * 数据生成
 * @param res 返回的结果
 * @param setColumns 修改状态
 * @param setDataSource  修改状态
 * @param columns  table的columns
 * @param dataSource table的dataSource
 */
export function handleData(
  res,
  setColumns,
  setDataSource,
  columns,
  dataSource,
) {
  if (res) {
    let title = res.headers,
      content = res.resultList,
      length = title.length;
    title.map((value, index) => {
      const obj: any = {
        title: value,
        dataIndex: value,
        width: 120,
        render: (value) => {
          if (value !== null && value !== undefined) {
            return value.substr(0, 4) == 'http' ? (
              <a href={value} target="_blank" rel="noreferrer">
                {value}
              </a>
            ) : (
              value
            );
          } else {
            return <span style={{ color: '#b9b5b5' }}>{'NULL'}</span>;
          }
        },
      };
      if (length > 5 && index == 0) {
        obj.width = 150;
        obj.fixed = 'left';
      }
      if (title.length > 5 && index == title.length - 1) {
        obj.width = undefined;
      }

      columns.push(obj);
    });
    content.map((val) => {
      let obj = {};
      title.map((res, i) => {
        val.map((value, j) => {
          i == j &&
            Object.assign(obj, {
              [res]: value,
            });
        });
      });
      dataSource.push(obj);
    });
    setColumns(columns);
    setDataSource(dataSource);
  }
}

export const style = {
  cursor: 'pointer',
  marginLeft: 5,
};

export const wrapStyle = {
  display: 'inline-flex',
};

export function updateStateData(setCallBack, prevData, property, value) {
  let data = cloneDeep(prevData);
  data[property] = value;
  setCallBack(Object.assign({}, prevData, data));
}

export function fetchComponentData(
  generalQueryId,
  parameters,
  callback,
  generalQueryCode,
  errorCallback,
) {
  let uri = '',
    // 排除其它业务参数
    data =
      !!parameters && !!parameters.params
        ? Object.assign({ params: JSON.stringify(parameters.params) })
        : {};
  uri = IW_HOST + '/generalqueryservices/result.do';
  data.code = generalQueryCode;
  axios
    .post(uri, queryString.stringify(data), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then((response) => {
      if (response.data.success) {
        if (!!callback) {
          callback(response.data.data);
        } else {
          // if (isLocal) {
          //     console.debug(response.data.data);
          // }
        }
      } else {
        // if (isLocal) {
        //     console.error(response.data.msg || "服务端处理失败");
        // }
        if (errorCallback) {
          errorCallback(response.data.msg);
        }
      }
    })
    .catch((error) => {
      // if (isLocal) {
      //     console.error(error);
      // }
      message.error(error);
      if (errorCallback) {
        errorCallback(error);
      }
    });
}
