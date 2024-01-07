import React from "react";
import { NavLink } from "react-router-dom";
const HomeMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group my-4">
          <h1>Home panel</h1>
          <NavLink
            to="/home"
            className="list-group-item list-group-item-action"
          >
            image/video
          </NavLink>
          <NavLink
            to="/home-category"
            className="list-group-item list-group-item-action"
          >
            Home Category
          </NavLink>
          <NavLink
            to="/in-focus"
            className="list-group-item list-group-item-action"
          >
            In focus: Dress
          </NavLink>
          <NavLink
            to="/home-banner"
            className="list-group-item list-group-item-action"
          >
            Home Banner text
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Best Seller
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            your every mood
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Review
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            fotter
          </NavLink>

          <li className="list-group-item list-group-item-action">Staff</li>

          <li className="list-group-item list-group-item-action">Query</li>
          {/* <li className="list-group-item list-group-item-action">Logout</li> */}
        </div>
      </div>
    </>
  );
};

export default HomeMenu;
