import React from 'react';
import {
  // BrowserRouter as Router,
  // Route,
  // Link,
  // Switch,
  // Redirect,
  useLocation
} from 'react-router-dom';

import './Err404.scss';
export default () => {
  const location = useLocation();
  return (
    <div className="page-err404">
      <h1>404 {location.pathname} Not Found</h1>
    </div>
  );
};
