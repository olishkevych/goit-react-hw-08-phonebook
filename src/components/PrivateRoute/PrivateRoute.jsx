import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedIn } from 'redux/selectors';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const loggedIn = useSelector(selectLoggedIn);
  return loggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
