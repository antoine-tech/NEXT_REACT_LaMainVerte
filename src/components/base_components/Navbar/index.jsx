import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../requests/user";
import { useSelector, useDispatch } from "react-redux";
import WEBSOCKET_CLIENT from "../../../services/WebsocketClient";
import { setNotifications } from "../../../redux/actions";
import useJwtToken from "../../../hooks/useJwtToken";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ToogleSwitch from "../ToogleSwitch/index";
import MenuLeft from "../MenuLeft/index";
import LaMainVerteBrandNav from "../../base_components/icons/LaMainVerteBrandNav/index";
import SettingIcon from "../icons/SettingIcon/index";
import "./index.scss";
import IconNotification from "../icons/IconNotification/index";
import MenuNotification from "../../MenuNotification";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const { getJwtToken, unSetJwtToken } = useJwtToken();
  const { setCurrentUser, current_user } = useCurrentUser();
  const [areNotifcationDisplayed, setNotificationDisplayed] = useState(false);
  const [isMenuLeftDisplayed, setIsMenuLeftDisplayed] = useState(false);

  const handleSignAction = async (current_user) => {
    if (current_user) {
      try {
        await logout(getJwtToken);
        setCurrentUser(null);
        unSetJwtToken();
      } catch (error) {
        console.error(error);
      }
    } else {
      history.push("/login");
    }
  };

  const handleMenuToogle = () => {
    setIsMenuLeftDisplayed(!isMenuLeftDisplayed);
  };

  useEffect(() => {
    WEBSOCKET_CLIENT.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    WEBSOCKET_CLIENT.onmessage = function (newMessage) {
      const data = JSON.parse(newMessage.data);
      !data.ping &&
        dispatch(
          setNotifications([...notifications, JSON.parse(newMessage.data)])
        );
    };

    WEBSOCKET_CLIENT.onclose = function (closeEvent, WEBSOCKET_CLIENT) {
      const CONNECTION_TYPE =
        process.env.NODE_ENV === "production" ? "wss" : "ws";
      WEBSOCKET_CLIENT = new WebSocket(
        `${CONNECTION_TYPE}://la-main-verte-ws.herokuapp.com`
      );
    };
  });

  return (
    <>
      <nav className="flex w-full justify-between items-center p-4 relative">
        <Link to="/news_feed" title="fil d'actualité">
          <LaMainVerteBrandNav />
        </Link>

        <ul className="flex lg:hidden items-center">
          <li>
            <SettingIcon onClick={handleMenuToogle} classNames={["nav-link"]} />
          </li>
          <li className="mx-4 flex flex-col justify-center">
            <IconNotification
              onClick={() => setNotificationDisplayed(!areNotifcationDisplayed)}
              notificationNumber={notifications.length}
            />
          </li>
        </ul>

        <ul className="hidden lg:flex items-center">
          {current_user ? (
            <>
              <Link to="/profile" className="mx-4" title="Mon profil">
                Mon profil
              </Link>

              {current_user.is_admin && (
                <Link to="/admin" className="mx-4" title="Administrateur">
                  Administrateur
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="mx-4" title="Se connecter">
                Connexion
              </Link>

              <Link to="/register" className="mx-4" title="Créer un compte">
                Inscription
              </Link>
            </>
          )}
          <li className="mx-4 flex flex-col justify-center">
            <ToogleSwitch onchange={() => handleSignAction(current_user)} />
          </li>

          <li className="mx-4 flex flex-col justify-center">
            <IconNotification
              onClick={() => setNotificationDisplayed(!areNotifcationDisplayed)}
              notificationNumber={notifications.length}
            />
          </li>
        </ul>
      </nav>
      {isMenuLeftDisplayed && (
        <MenuLeft
          current_user={current_user}
          handleMenuToogle={handleMenuToogle}
          handleSignAction={handleSignAction}
        />
      )}

      {areNotifcationDisplayed && (
        <MenuNotification
          handleMenuToogle={() =>
            setNotificationDisplayed(!areNotifcationDisplayed)
          }
        />
      )}
    </>
  );
};

export default Navbar;
