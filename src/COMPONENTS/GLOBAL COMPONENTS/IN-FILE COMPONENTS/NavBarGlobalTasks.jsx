import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBarGlobalTasks() {
  return (
    <div
      className="custom-inner-nav
            mobile-s:hidden
            laptop-s:flex
            laptop-l:flex
            4k:text-4xl"
    >
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
        Ongoing
      </NavLink>
      <NavLink
        to="/tasks/missing"
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
        Missing
      </NavLink>
      <NavLink
        to="/tasks/done"
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
        Done
      </NavLink>
    </div>
  );
}
