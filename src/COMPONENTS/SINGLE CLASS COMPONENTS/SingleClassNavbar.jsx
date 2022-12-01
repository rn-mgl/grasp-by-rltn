import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function SingleClassNavbar(props) {
  const path = window.location.pathname;
  const isClassPage = path.split("/").length < 4;
  return (
    <React.Fragment>
      <div
        className="absolute top-5 z-0 w-8/12 left-2/4 -translate-x-2/4 custom-navbar custom-inner-nav
              mobile-s:hidden
              laptop-s:flex
              4k:top-10 4k:text-2xl"
      >
        <NavLink
          to={`/class/${props.class_id}`}
          style={({ isActive }) =>
            isActive && isClassPage
              ? {
                  color: "#45C4B0",
                  textDecoration: "underline",
                  textDecorationThickness: "0.2rem",
                }
              : undefined
          }
        >
          Class
        </NavLink>
        <NavLink
          to={`/class/${props.class_id}/tasks`}
          style={({ isActive }) =>
            isActive || path.endsWith("archived-tasks")
              ? {
                  color: "#45C4B0",
                  textDecoration: "underline",
                  textDecorationThickness: "0.2rem",
                }
              : undefined
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to={`/class/${props.class_id}/people`}
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#45C4B0",
                  textDecoration: "underline",
                  textDecorationThickness: "0.2rem",
                }
              : undefined
          }
        >
          People
        </NavLink>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
