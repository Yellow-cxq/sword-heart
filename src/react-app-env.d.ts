/// <reference types="react-scripts" />
/* 允许在ts中使用import styles from '*.less' */
declare module '*.less' {
    const styles: any;
    export = styles;
  }
declare module '*.css';
declare module '@yunti-private/tools';

declare module 'lodash';

declare module 'react-copy-to-clipboard';
declare module '@loadable/component';