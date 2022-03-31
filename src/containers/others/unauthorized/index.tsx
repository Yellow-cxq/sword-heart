import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import imgUnauthorized from 'assets/img/unauthorized.png';
import './style.less';

interface IProps extends RouteComponentProps {}

const View500: React.FC<IProps> = () => (
  <div className="unauthorized_wrapper">
    <img src={imgUnauthorized} alt="" />
    <p>未授权，来找爹授权</p>
  </div>
);

export default View500;
