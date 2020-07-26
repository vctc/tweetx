import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const token = localStorage.tweetxUser;

  return (
    <Route
      {...rest}
      render={props =>
        token && restricted ? <Redirect to="/feed" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
