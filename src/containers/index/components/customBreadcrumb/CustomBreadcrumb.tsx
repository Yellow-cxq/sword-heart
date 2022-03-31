import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';

const CustomBreadcrumb = ({ arr }: { arr: any[] }) => {
  const title = arr[arr.length - 1];
  return (
    <div className="iw_custom_bread">
      <div className="bread_left">
        <span className="bread_title" title={title}>
          {title}
        </span>
      </div>
    </div>
  );
};

function shouldRender(nextProps: { arr: any[] }, prevProps: { arr: any[] }) {
  if (nextProps.arr.join() === prevProps.arr.join()) {
    return true;
  }
  return false;
}

export default React.memo(CustomBreadcrumb, shouldRender);
