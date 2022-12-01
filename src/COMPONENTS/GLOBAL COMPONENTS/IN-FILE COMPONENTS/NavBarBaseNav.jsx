import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBarBaseNav() {
  return (
    <div
      className="custom-inner-nav
            mobile-s:hidden
            laptop-s:flex
            laptop-l:flex
            4k:text-4xl"
    >
      <NavLink
        to="/home"
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
        Home
      </NavLink>
      <NavLink
        to="/classes"
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
        My Classes
      </NavLink>
      <NavLink
        to="/tasks/ongoing"
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
        Tasks
      </NavLink>
    </div>
  );
}
