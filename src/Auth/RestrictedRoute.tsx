import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const RestrictedRoute = (props:any) => {
  // const isAuth  = false

  const token = localStorage.getItem('auth');


  return <>{!token ? <Route {...props} /> : <Redirect to='/' />}</>;

};

export default RestrictedRoute;
