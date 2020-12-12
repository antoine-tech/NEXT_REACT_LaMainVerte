import React from "react";
import { Link} from "react-router-dom";
import LaMainVerteBrandNav from "../icons/LaMainVerteBrandNav/index";
import SettingIcon from "../icons/SettingIcon";
import ToogleSwitch from "../ToogleSwitch/index";
import { logout } from "../../requests/user";
import useJwtToken from "../../hooks/useJwtToken";
import useCurrentUser from "../../hooks/useCurrentUser";

const Navbar = () => {
  const { getJwtToken, unSetJwtToken } = useJwtToken();
  const { setCurrentUser } = useCurrentUser();
  const handleLogout = async () => {
    try {
      await logout(getJwtToken);
      setCurrentUser(null);
      unSetJwtToken();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="flex w-full justify-between items-center p-4">
      <Link to="/" title="home">
        <LaMainVerteBrandNav />
      </Link>

      <ul className="flex">
        <li className="mx-4 flex flex-col justify-center">
          <ToogleSwitch onchange={handleLogout} />
        </li>
        <li>
          <Link to="/" title="home">
            <SettingIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
