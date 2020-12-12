import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Garden from "./pages/Garden";
import NewGarden from './pages/NewGarden';
import useCurrentUser from "./hooks/useCurrentUser";
import { getUserDatas } from "./requests/user";
import useJwtToken from "./hooks/useJwtToken";
import GardenHistory from "./pages/GardenHistory";
import UnAuthRoute from "./components/routes/UnAuthRoute/index";
import AuthRoute from "./components/routes/AuthRoute";

const App = () => {
  const { pathname } = useLocation();
  const { setCurrentUser, current_user } = useCurrentUser();
  const [isNavbarPresent, setNavbarPresent] = useState(true);
  const { getJwtToken } = useJwtToken();

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

  useEffect(() => {
    pathname === "/login" || pathname === "/register"
      ? setNavbarPresent(false)
      : setNavbarPresent(true);
  }, [pathname]);

  return (
    <>
      {isNavbarPresent && <Navbar />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <UnAuthRoute
          current_user={current_user}
          path="/login"
          component={Login}
        />
        <UnAuthRoute
          current_user={current_user}
          path="/register"
          component={Register}
        />
        <AuthRoute
          current_user={current_user}
          exact
          path="/profile"
          component={Profile}
        />
        <AuthRoute
          current_user={current_user}
          exact
          path="/garden/:id/events"
          component={GardenHistory}
        />
        <AuthRoute
          current_user={current_user}
          exact
          path="/garden/:id"
          component={Garden}
        />
        <AuthRoute
          current_user={current_user}
          exact path="/new-garden"
          component={NewGarden}
        />
      </Switch>
    </>
  );
};

export default App;
