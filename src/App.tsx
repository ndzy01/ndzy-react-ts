import React, { Suspense } from 'react';
import {
  // Router,
  Route,
  Switch,
  HashRouter,
  // Link,
  // RouteProps,
  BrowserRouter
  // Redirect
} from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { Provider, connect } from 'react-redux';
import { useMount } from 'ahooks';

import store from './redux';
import { getfavicon } from './redux/favicon/favicon.redux';
import Err404 from './views/404';
interface Props extends BrowserRouter {
  getfavicon(): any;
  routes: any[];
}
function RouteWithSubRoutes(route: any) {
  return (
    <Route
      exact={route.exact}
      // exact={true}
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
const Test = connect((state) => state, { getfavicon })((props: Props) => {
  useMount(() => {
    props.getfavicon();
  });

  return (
    <div>
      <Switch>
        {props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
});
const Test1 = (props: any) => {
  useMount(() => {});
  return <div>Test1</div>;
};
const routes = [
  {
    path: '/test',
    component: Test,
    exact: false,
    routes: [
      {
        path: '/test/test01',
        component: Test1,
        exact: false
      }
    ]
  }
];

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Suspense fallback={<span>正在加载！</span>}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
              <Route component={Err404}></Route>
            </Switch>
          </Suspense>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
