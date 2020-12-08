import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cookies from "js-cookie";
import useCurrentUser from "./hooks/useCurrentUser";

/* ===== INTL ========
import { IntlProvider } from 'react-intl';
import textFr from './translation/fr';
import textEn from './translation/en';
import { useDispatch } from 'react-redux';
import { Cookies } from 'js-cookie';
import useCurrentUser from './hooks/useCurrentUser';

const text = {
  fr: textFr,
  en: textEn,
}
*/

const App = () => {

  const {setCurrentUser, current_user, isAuth, setIsAuth} = useCurrentUser();
  // loading current user at first load of compnent or reload of the page
  useEffect(() => {

    setCurrentUser("test");
    

  }, []);

  // method to check auth absed on jwt_token key presence in cookies
  const checkTokenPresent = () => {
      return Cookies.get('jwt_token') ? true : false
  };

  const checkAuth = () => {
    return isAuth
};


  //Private routes who do not need authentification
  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  //Private routes who do need authentification
  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

  return (
    // <IntlProvider locale={language} messages={text[language]}>
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <UnAuthRoute path="/login" component={Login} />
          <UnAuthRoute path="/register" component={Register} />
          <AuthRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
    // </ IntlProvider>
  );
};

export default App;
