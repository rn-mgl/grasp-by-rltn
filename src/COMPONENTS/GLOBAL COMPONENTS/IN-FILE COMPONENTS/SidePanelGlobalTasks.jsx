import React from "react";

import { NavLink } from "react-router-dom";
import { GrRefresh, GrDocumentMissing } from "react-icons/gr";

import { MdDoneAll } from "react-icons/md";

export default function SidePanelGlobalTasks() {
  const bgColor = "#E1E6E2";

  return (
    <div className="laptop-s:hidden">
      <NavLink
        to={`/tasks/ongoing`}
        className="custom-panel-bars
  laptop-l:text-base laptop-l:w-full 
      4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
      >
        <GrRefresh
          className="laptop-l:scale-110 
          4k:scale-[150%]"
          size={"1.3rem"}
        />
        <div>Ongoing</div>
      </NavLink>
      <NavLink
        to={`/tasks/missing`}
        className="custom-panel-bars
  laptop-l:text-base laptop-l:w-full 
      4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
      >
        <GrDocumentMissing
          className="laptop-l:scale-110 
          4k:scale-[150%]"
          size={"1.3rem"}
        />
        <div>Missing</div>
      </NavLink>
      <NavLink
        to={`/tasks/done`}
        className="custom-panel-bars
  laptop-l:text-base laptop-l:w-full 
      4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
      >
        <MdDoneAll
          className="laptop-l:scale-110 
          4k:scale-[150%]"
          size={"1.3rem"}
        />
        <div>Done</div>
      </NavLink>
      <div className="custom-divider w-full ml-20" />
    </div>
  );
}
