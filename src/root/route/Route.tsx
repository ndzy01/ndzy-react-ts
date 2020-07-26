import React, { Suspense, lazy } from 'react';

import {
  // Router,
  Route,
  Switch,
  HashRouter
  // Link,
  // RouteProps,
  // BrowserRouter
  // Redirect
} from 'react-router-dom';
import Err404 from '../../views/404';

const routes = [
  {
    path: '/home',
    view: 'home/Home',
    exact: true,
    routes: [
      {
        path: '/home/home01',
        view: 'home/home1/Home1'
      }
    ]
  }
];

export const treeToList = (tree: any) => {
  let queen: any[] = [];
  const out = [];
  queen = queen.concat(tree);
  while (queen.length) {
    const first = queen.shift();
    if (first.routes) {
      queen = queen.concat(first.routes);
      delete first['routes'];
    }
    out.push(first);
  }
  return out;
};

const route_ = treeToList(routes).map((route) => {
  return {
    ...route,
    component: lazy(() => import('../../views/' + route.view))
  };
});

export default () => {
  return (
    <HashRouter>
      <Suspense fallback={<span>正在加载！</span>}>
        <Switch>
          {route_.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          <Route path="*" component={Err404}></Route>
        </Switch>
      </Suspense>
    </HashRouter>
  );
};
