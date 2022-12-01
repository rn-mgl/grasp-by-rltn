import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function ToGradeNavbar(props) {
  return (
    <React.Fragment>
      <div
        className="absolute top-5 z-0 w-8/12 left-2/4 -translate-x-2/4 custom-navbar custom-inner-nav
          mobile-s:hidden
          laptop-s:flex
          4k:top-10 4k:text-2xl"
      >
        <NavLink
          to={`/class/${props.class_id}/tasks/${props.task_id}`}
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
          Task
        </NavLink>
        <NavLink
          to={`/class/${props.class_id}/to-grade/${props.task_id}`}
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
          Students
        </NavLink>
      </div>

      <div className="absolute top-20 z-0 w-7/12 left-2/4 -translate-x-2/4 custom-navbar custom-flex gap-5 laptop-s:hidden">
        <NavLink
          className="custom-btn text-sm w-full bg-pr-gry custom-flex"
          to={`/class/${props.class_id}/tasks/${props.task_id}`}
          style={({ isActive }) =>
            isActive
              ? {
                  background: "#0D0D0D",
                  color: "#F2F2F2",
                }
              : undefined
          }
        >
          Task
        </NavLink>
        <NavLink
          className="custom-btn text-sm w-full bg-pr-gry custom-flex"
          to={`/class/${props.class_id}/to-grade/${props.task_id}`}
          style={({ isActive }) =>
            isActive
              ? {
                  background: "#0D0D0D",
                  color: "#F2F2F2",
                }
              : undefined
          }
        >
          Students
        </NavLink>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
