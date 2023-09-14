import React from "react";
import "../../css/layout/UserMenu.css";
import { NavLink } from "react-router-dom";

const UserMenu = (props) => {
  return props.hidden ? null : (
    <div className="user-menu">
      <div className="drop-item">
        <div className="icontainer">
          <img src="/images/cart.png" />
        </div>
        <NavLink to="/cart">View cart / Checkout</NavLink>
      </div>
      <div className="drop-item">
        <div className="icontainer">
          <img src="/images/login.png" />
        </div>
        <NavLink to="/login">Sign in / Register/ Logout</NavLink>
      </div>
      <div className="drop-item">
        <div className="icontainer">
          <img src="/images/help.png" />
        </div>
        <NavLink to="/help">Help / Track Order</NavLink>
      </div>
      <div className="drop-item">
        <div className="icontainer">
          <img src="/images/admin.png" />
        </div>
        <NavLink to="/admin">Admin Page</NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
