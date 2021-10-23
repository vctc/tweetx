import React from 'react';
import './app.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Pages/Profile';
import Users from './components/Pages/Users';
import Feed from './components/Pages/Feed';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './components/hooks/useAuth';
import firebase, { FirebaseContext } from './components/Firebase';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Forgot from './components/Auth/Forgot/Forgot';

const App = () => {
  const authUser = useAuth();

  return (
    <Router>
      <FirebaseContext.Provider value={{ authUser, firebase }}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="app">
          <Header />

          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/login" />;
              }}
            />

            <PublicRoute
              restricted={true}
              component={Login}
              path="/login"
              exact
            />

            <PublicRoute
              restricted={true}
              component={Signup}
              path="/signup"
              exact
            />

            <PublicRoute
              restricted={true}
              component={Forgot}
              path="/forgot"
              exact
            />

            <PrivateRoute component={Profile} path="/profile" exact />

            <PrivateRoute component={Users} path="/users" exact />

            <PrivateRoute component={Feed} path="/feed" exact />
            <Redirect from="*" to="/404page" />
          </Switch>
        </div>
      </FirebaseContext.Provider>
    </Router>
  );
};

export default App;
