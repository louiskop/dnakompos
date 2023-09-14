import React from "react";
import "../../css/pages/AdminPage.css";
import { NavLink } from "react-router-dom";

import Button from "../layout/Button";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>DNA kompos Admin page</h1>
      <NavLink to="/">Client View</NavLink>
      <div className="orders">
        <h2>Orders</h2>
        <ul>
          <li>Order 1</li>
          <li>Order 1</li>
          <li>Order 1</li>
          <li>Order 1</li>
          <li>Order 1</li>
        </ul>
      </div>
      <div className="admin-actions">
        <Button text="Update Stock" />
        <Button text="Add/Remove Products" />
        <Button text="Statistics" />
      </div>
    </div>
  );
};

export default AdminPage;
