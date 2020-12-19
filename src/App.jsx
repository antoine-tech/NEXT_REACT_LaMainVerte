import React, { useEffect, useState } from "react";
import { Switch, useLocation, Route } from "react-router-dom";
import Navbar from "./components/base_components/Navbar/index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Garden from "./pages/Garden";
import AdminDashboard from "./pages/AdminDashboard";
import NewGarden from "./pages/NewGarden";
import Concept from "./pages/Concept";
import useCurrentUser from "./hooks/useCurrentUser";
import { getUserDatas } from "./requests/user";
import useJwtToken from "./hooks/useJwtToken";
import GardenHistory from "./pages/GardenHistory";
import UnAuthRoute from "./components/routes/UnAuthRoute/index";
import AdminRoute from "./components/routes/AdminRoute/index";
import AuthRoute from "./components/routes/AuthRoute";
import PublicProfile from "./pages/PublicProfile";
import WEBSOCKET_CLIENT from "./sevices/WebsocketClient";

const App = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [lastMessageTime, setLastMesageTime] = useState(Date.now());
  const [instantMessages, setInstantMessages] = useState([]);
  const { pathname } = useLocation();
  const { setCurrentUser, current_user } = useCurrentUser();
  const [isNavbarPresent, setNavbarPresent] = useState(true);
  const { getJwtToken } = useJwtToken();

  useEffect(() => {
    const fetchUserDatas = async () => {
      const response = await getUserDatas(getJwtToken);
      response.user && setCurrentUser(response.user);
      return response;
    };

    if (getJwtToken) {
      fetchUserDatas();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);

    if (currentTime - lastMessageTime >= 45 * 1000) {
      WEBSOCKET_CLIENT.send(JSON.stringify({ ping: Date.now() }));
      setLastMesageTime(Date.now());
       return clearInterval(interval)
    }

  }, [currentTime]);

  useEffect(() => {
    WEBSOCKET_CLIENT.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    WEBSOCKET_CLIENT.onmessage = function (newMessage) {
      const data = JSON.parse(newMessage.data);
      !data.ping &&
        setInstantMessages([...instantMessages, JSON.parse(newMessage.data)]);
    };

    WEBSOCKET_CLIENT.onclose = function (closeEvent, WEBSOCKET_CLIENT) {
      const CONNECTION_TYPE =
        process.env.NODE_ENV === "production" ? "wss" : "ws";
      WEBSOCKET_CLIENT = new WebSocket(
        `${CONNECTION_TYPE}://la-main-verte-ws.herokuapp.com`
      );
    };
  });

  useEffect(() => {
    pathname === "/login" || pathname === "/register"
      ? setNavbarPresent(false)
      : setNavbarPresent(true);
  }, [pathname]);

  return (
    <>
      {isNavbarPresent && <Navbar instantMessages={instantMessages} />}
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
        <Route exact path="/news_feed">
          <Home />
        </Route>

        <AdminRoute
          current_user={current_user}
          exact
          path="/admin"
          component={AdminDashboard}
        />
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
        <Route exact path="/" component={Concept} />
        <Route exact path="/garden/:garden_id" component={Garden} />
        <Route exact path="/user/:user_id" component={PublicProfile} />
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
