import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';


const Router = DefaultRouter;

const routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/Application/dashCalendar",
        "exact": true,
        "component": require('../Application/dashCalendar.js').default
      },
      {
        "path": "/Application",
        "exact": true,
        "component": require('../Application/index.js').default
      },
      {
        "path": "/Login/NormalLoginForm",
        "exact": true,
        "component": require('../Login/NormalLoginForm.js').default
      },
      {
        "path": "/Login",
        "exact": true,
        "component": require('../Login/index.js').default
      },
      {
        "path": "/Regist/RegistrationForm",
        "exact": true,
        "component": require('../Regist/RegistrationForm.js').default
      },
      {
        "path": "/Regist",
        "exact": true,
        "component": require('../Regist/index.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.jsx').default
      },
      {
        "component": () => React.createElement(require('/Users/dark/project/myapp-antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/dark/project/myapp-antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
<Router history={history}>
      { renderRoutes(routes, props) }
    </Router>
  );
}
