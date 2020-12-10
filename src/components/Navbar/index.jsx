import React from "react";
import { Link } from "react-router-dom";
import LaMainVerteBrandNav from "../icons/LaMainVerteBrandNav/index";
import SettingIcon from "../icons/SettingIcon";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-between items-center p-4">
      <Link to="/" title="home">
        <LaMainVerteBrandNav />
      </Link>

      <ul className="flex">
        <li className="mx-4 flex flex-col justify-center">
          <div className="toogleSwitch">
            <input type="checkbox"></input>
            <div className="switch"></div>
          </div>
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
