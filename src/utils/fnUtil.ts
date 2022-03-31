import moment from 'moment';
// import { isLocalHOST } from './introduction';
// import BaseHelper from 'server/index';
// import { SystemInfo } from 'server/index.interface';

export function formDateAndTime(
  date: string | number,
  type?: string,
  style?: string,
) {
  if (!date) {
    return '--';
  }
  switch (type) {
    case 'YMDHms':
      const YMDHms = getMomentFormat('YYYY-MM-DD', style) + ' HH:mm:ss';
      return moment(date).format(YMDHms);
    case 'YMDHm':
      const YMDHm = getMomentFormat('YYYY-MM-DD', style) + ' HH:mm';
      return moment(date).format(YMDHm);
    case 'YMD':
      const YMD = getMomentFormat('YYYY-MM-DD', style);
      return moment(date).format(YMD);
    case 'MD':
      const MD = getMomentFormat('MM-DD', style);
      return moment(date).format(MD);
    case 'Hms':
      return moment(date).format('HH:mm:ss');
    case 'Hm':
      return moment(date).format('HH:mm');
    default:
      const defaultDateTime =
        getMomentFormat('YYYY-MM-DD', style) + ' HH:mm:ss';
      return moment(date).format(defaultDateTime);
  }

  function getMomentFormat(dateFormat: string, style?: string) {
    return style === '.' ? dateFormat.replace('-', '.') : dateFormat;
  }
}

// 列表 有效值判断
export function isValidValue(value: any) {
  switch (typeof value) {
    case 'string':
      return value === '' ? '-' : value;
    case 'number':
      return value;
    case 'undefined':
      return '-';
    case 'object':
      return value === null ? '-' : value;
    default:
      return value;
  }
}

//列表查询下拉框数据格式化
export function formatQueryFormData<T, K extends keyof T>(
  data: T[] = [],
  id: K,
  name: K,
) {
  const obj: {
    [key: string | number]: {
      text: T[K];
    };
  } = {};
  if (data.length > 0) {
    data.forEach((item) => {
      const key =
        typeof item[id] === 'number'
          ? (item[id] as unknown as number)
          : `${item[id]}`;
      obj[key] = { text: item[name] };
    });
  }
  return obj;
}

export function getLoginInfo() {
  //读取cookie
  let arr,
    reg = new RegExp('(^| )' + 'accountInfo' + '=([^;]*)(;|$)');
  let accountInfo: string | null = '';
  if ((arr = document.cookie.match(reg))) {
    accountInfo = unescape(arr[2]);
  } else {
    accountInfo = null;
  }
  return accountInfo;
}

//判断值是否为空
export function valueIsNull(value) {
  return !!value ? `${value}` : ` 无`;
}
//敏感等级
export const Level = {
  0: '普通',
  1: '中级',
  2: '高级',
};

//格式类型
export const codeNewType = {
  0: 'tinyint(4)',
  1: 'int(10)',
  2: 'bigint(20)',
  3: 'datetime',
  4: 'tinytext',
  5: 'text',
  6: 'longtext',
  7: 'varchar(20)',
  8: 'varchar(50)',
  9: 'varchar(255)',
  10: 'varchar(1000)',
  11: 'varchar(2000)',
  12: 'mediumtext',
  13: 'smallint',
  14: 'char(20)',
  15: 'date',
  16: 'bit',
  17: 'float',
  18: 'varchar(100)',
  19: 'varchar(150)',
};

//通用查询 状态
export const GenericStatus = {
  0: '删除',
  1: '在用',
  2: '废弃',
  3: '新建',
};

//表管理-字段是否同一类型
export function CheckFieldType(type) {
  return {
    0: 'int',
    1: 'int',
    2: 'long',
    3: 'datetime',
    4: 'text',
    5: 'text',
    6: 'text',
    7: 'varchar',
    8: 'varchar',
    9: 'varchar',
    10: 'varchar',
    11: 'varchar',
    12: 'text',
    18: 'varchar',
    19: 'varchar',
  }[type];
}
export function formateFieldType(type) {
  return codeNewType[type];
}
//索引类型
export const dstableindexervicesType = {
  0: 'btree',
  1: 'hash',
  2: 'fulltext',
};

export const handleWidth = (type = 'change') => {
  const wrapper = document.querySelector('.iw_site_background') as HTMLElement;
  if (!!wrapper) {
    const handleObj = {
      change: () => {
        const originWidth = wrapper.style.minWidth;
        sessionStorage.setItem('originWidth', originWidth);
        wrapper.style.minWidth = 'auto';
      },
      recover: () =>
        (wrapper.style.minWidth =
          sessionStorage.getItem('originWidth') || 'auto'),
    };
    handleObj[type]();
  }
};

// 判断当前是否是开发环境
export function isDev() {
  const host = window.location.host;
  const currentDomains = host.split('.');
  const currentProjects = currentDomains[0].split('-');
  const env = currentProjects.length === 2 ? currentProjects[1] : '';
  if (
    /192\.168\.*/.test(location.host) ||
    /localhost/.test(location.host) ||
    ['daily', 'dev'].includes(env)
  ) {
    return true;
  } else {
    return false;
  }
}

export const debounce = (
  func: Function,
  delay: number,
  immediate: boolean = false,
) => {
  let timer: any;
  return (...args: any) => {
    if (immediate) {
      func.apply(this, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 输入框获取的值去掉前后空格
export const objectTrim = (obj) => {
  const trimObj = {};
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      trimObj[key] = obj[key].trim();
    } else {
      trimObj[key] = obj[key];
    }
  }
  return trimObj;
};

// 带下划线字符串转为驼峰格式
export const changeToHump = (str) => {
  if (str.includes('_')) {
    let reg = /(_.)(.*?)/g;
    let newStr = str.replace(reg, (item) =>
      item.substring(1).toLocaleUpperCase(),
    );
    return newStr;
  } else {
    return str;
  }
};

// 获取系统名称
// export const getSysInfo = async () => {
//   const sysInfoLocal = sessionStorage.getItem('sysInfo');
//   if (sysInfoLocal) {
//     return JSON.parse(sysInfoLocal);
//   } else {
//     const res = await BaseHelper.handleGetSysInfo<SystemInfo>();
//     sessionStorage.setItem('sysInfo', JSON.stringify(res.data));
//     return res.data;
//   }
// };
