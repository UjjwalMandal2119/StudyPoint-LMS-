import React from 'react';
import { useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const location = useLocation();
  const element = useRoutes(routes);

  useLayoutEffect(() => {
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return element;
}

export default App;
