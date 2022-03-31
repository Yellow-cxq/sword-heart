import React, { useEffect, useState } from 'react';
import style from './home.module.less';
import loginLogo from 'assets/img/loginLogo.png';
// import { isMobileBrowser } from '@yunti-private/tools';
// import { handleWidth, getSysInfo } from 'utils/fnUtil';
// import { SystemInfo } from 'server/index.interface';

import './home.css';

const Home = () => {
  // const [sysInfo, setSysInfo] = useState<SystemInfo>({
  //   sysName: '',
  //   description: '',
  // });

  // useEffect(() => {
  //   handleGetSysInfo();
  //   if (isMobileBrowser()) handleWidth();
  //   return () => {
  //     handleWidth('recover');
  //   };
  // }, []);

  // 获取系统名称
  // const handleGetSysInfo = async () => {
  //   const sysInfo = await getSysInfo();
  //   setSysInfo(sysInfo);
  // };

  return (
    <div className={style['home_wrapper']}>
      <div className="home_header">
        <div className="home_logo">
          <img src={loginLogo} />
        </div>
        <div className="home_title">
          {/* iWork- */}
          {'嗯是乌宣宣的'}
          {'描述'}
        </div>
        <div className="home_tip">
          {'还是描述'}
        </div>
      </div>
    </div>
  );
};

export default Home;
