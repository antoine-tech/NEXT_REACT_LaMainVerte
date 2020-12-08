// REACT MODULES
import React, { useEffect } from "react";

// REACT ROUTER
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

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
  const { setCurrentUser, current_user } = useCurrentUser();
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

  const checkAuth = () => {
    return current_user !== null;
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
  );
};

export default App;
