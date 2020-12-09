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
import Cookies, { get } from "js-cookie";

// CUSTOMHOOKS
import useCurrentUser from "./hooks/useCurrentUser";
import { getUserDatas } from "./requests/user";
import useJwtToken from "./hooks/useJwtToken";

const App = () => {

  // get current path location using hook from react router  
  const { pathname } = useLocation();

  // current user custom hook to get and set currentUser in relation with redux global state
  const { setCurrentUser, current_user } = useCurrentUser();

  // CHeck wether navbar needs to be displayed or not
  const [isNavbarPresent, setNavbarPresent] = useState(true);

  // jwt token custom hook to get Cookies containing jwt token if available
  const { getJwtToken } = useJwtToken();

  // loading current user at first load of compnent or reload of the page
  useEffect(() => {
    const fetchUserDatas = async () => {
      const response = await getUserDatas(getJwtToken).then((res) =>
        res.json()
      );

      response.user && setCurrentUser(response.user);
      return response;
    };

    if (getJwtToken) {
      fetchUserDatas();
    }
  }, []);

  // useEffect reloading component on change of location
  useEffect(() => {
    pathname === "/login" || pathname === "/register"
      ? setNavbarPresent(false)
      : setNavbarPresent(true);
  }, [pathname]);

  // checking if user is authenticated or not 
  const checkAuth = () => {

    // production mode
    // return current_user !== null;

    // test purposes 
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
  
  // render
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
