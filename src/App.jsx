// REACT MODULES
import React, { useEffect, useState } from "react";

// REACT ROUTER
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// COMPONENTS
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// COKKIES
import Cookies from "js-cookie";

// CUSTOMHOOKS
import useCurrentUser from "./hooks/useCurrentUser";

const App = () => {
  const { pathname } = useLocation();

  const { setCurrentUser, current_user } = useCurrentUser();

  const [isNavbarPresent, setNavbarPresent] = useState(true);

  // loading current user at first load of compnent or reload of the page
  useEffect(() => {
    // try {
    //   const jwt = Cookies.get("jwt_token")

    // fetch
    setCurrentUser("test");

    //   // fetch
    // } catch (error) {

    // }
  }, []);

  useEffect(() => {
    pathname === "/login" || pathname === "/register"
      ? setNavbarPresent(false)
      : setNavbarPresent(true);
  }, [pathname]);

  const checkAuth = () => {
    // return current_user !== null;
    return true;
  };

  //Private routes who do not need authentification
  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        !checkAuth() ? (
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
    <>
      {isNavbarPresent && <Navbar />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <UnAuthRoute path="/login" component={Login} />
        <UnAuthRoute path="/register" component={Register} />
        <AuthRoute path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default App;
