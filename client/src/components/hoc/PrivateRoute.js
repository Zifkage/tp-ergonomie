import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

const PrivateRoute = ({component, path, cookies}) => {
  var user = cookies.get('user');
  return (
    <Route path={path} render={(props) => (
      user ? (
        React.createElement(component, props)
      ) : (
        <Redirect to="/login"/>
      )  
    )} />
  )
  
}

export default withCookies(PrivateRoute);