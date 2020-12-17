import React, { useEffect, useState } from "react";
import { Switch, useLocation, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Garden from "./pages/Garden";
import NewGarden from './pages/NewGarden';
import Concept from './pages/Concept';
import useCurrentUser from "./hooks/useCurrentUser";
import { getUserDatas } from "./requests/user";
import useJwtToken from "./hooks/useJwtToken";
import GardenHistory from "./pages/GardenHistory";
import UnAuthRoute from "./components/routes/UnAuthRoute/index";
import AuthRoute from "./components/routes/AuthRoute";
import PublicProfile from "./pages/PublicProfile";

const App = () => {
  const { pathname } = useLocation();
  const { setCurrentUser, current_user } = useCurrentUser();
  const [isNavbarPresent, setNavbarPresent] = useState(true);
  const { getJwtToken } = useJwtToken();

  useEffect(() => {
    const fetchUserDatas = async () => {
      const response = await getUserDatas(getJwtToken)
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
        <Route exact path="/">
          <Home />
        </Route>

        <AuthRoute
          current_user={current_user}
          exact
          path="/profile"
          component={Profile}
        />
        <Route
          exact
          path="/garden/:garden_id/events"
          component={GardenHistory}
        />
        <Route
          exact
          path="/concept"
          component={Concept}
        />
        <Route
          exact
          path="/garden/:garden_id"
          component={Garden}
        />
        <Route
          exact
          path="/user/:user_id"
          component={PublicProfile}
        />
        <AuthRoute
          current_user={current_user}
          exact
          path="/gardens/new"
          component={NewGarden}
        />
      </Switch>
    </>
  );
};

export default App;
