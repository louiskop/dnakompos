import React, { useState } from "react";
import "../../css/layout/Header.css";
import { NavLink } from "react-router-dom";

import UserMenu from "./UserMenu";

const Header = () => {
  const [hideUserDrop, setUserDrop] = useState(true);

  return (
    <nav className="navbar_main">
      <div className="navbar_logo">
        <img src="/images/temp_logo.png" height="50rem" />
        <p>DNA KOMPOS</p>
      </div>

      <div className="navbar_links">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/product">Products</NavLink>
          </li>
          <li>
            <NavLink to="/info">Info</NavLink>
          </li>
          <li>
            <div
              className="user"
              onClick={() => {
                setUserDrop(!hideUserDrop);
              }}
            >
              <img src="/images/user.png" />
              <UserMenu hidden={hideUserDrop} />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
