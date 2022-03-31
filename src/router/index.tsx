import React, { ReactNode } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IRouterItem } from './interface';
import routes from './routerMap';
import 'assets/style/global.less';

// 递归渲染路由
interface IProps {}
const IndexRouter: React.FC<IProps> = (props) => {
  const renderLoopRoute = (data: IRouterItem[]): ReactNode => {
    return data.map((item) => {
      const { routes: children = [], path, exact, redirect } = item;
      if (children.length > 0) {
        return renderLoopRoute(children);
      } else {
        return (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) =>
              redirect ? (
                <Redirect to={redirect} />
              ) : (
                <item.component {...props} />
              )
            }
          />
        );
      }
    });
  };

  return (
    <Switch>
      {renderLoopRoute(routes)}
    </Switch>
  );
};

export default IndexRouter;
