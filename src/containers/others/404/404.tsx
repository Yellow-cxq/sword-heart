import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import img404 from 'assets/img/404.png';
import './style.less';

interface IProps extends RouteComponentProps {}

const View404: React.FC<IProps> = () => (
  <div className="notFind_wrapper">
    <img src={img404} alt="" />
    <p>哦嚯，当前页面不存在</p>
  </div>
);

export default View404;
