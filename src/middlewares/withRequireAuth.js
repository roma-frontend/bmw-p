import React from 'react';
import { useLocation } from 'react-router-dom';
import RequireAuth from '../middlewares/requireAuth';

const withRequireAuth = (Component) => {
  const AuthComponent = (props) => {
    const location = useLocation();
    const redirectPath = localStorage.getItem('_redirectPath');

    if (redirectPath && redirectPath !== location.pathname) {
      return <RequireAuth><Component {...props} /></RequireAuth>;
    } else {
      return <Component {...props} />;
    }
  };

  return AuthComponent;
};

export default withRequireAuth;