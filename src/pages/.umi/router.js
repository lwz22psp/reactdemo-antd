import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.jsx').default
      },
      {
        "path": "/Regist",
        "exact": true,
        "component": require('../Regist/index.js').default
      },
      {
        "path": "/Regist/RegistrationForm",
        "exact": true,
        "component": require('../Regist/RegistrationForm.js').default
      },
      {
        "path": "/Login",
        "exact": true,
        "component": require('../Login/index.js').default
      },
      {
        "path": "/Login/NormalLoginForm",
        "exact": true,
        "component": require('../Login/NormalLoginForm.js').default
      },
      {
        "path": "/Application",
        "exact": true,
        "component": require('../Application/index.js').default
      },
      {
        "path": "/Application/dashCalendar",
        "exact": true,
        "component": require('../Application/dashCalendar.js').default
      },
      {
        "component": () => React.createElement(require('/Users/dark/.config/yarn/global/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/dark/.config/yarn/global/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
