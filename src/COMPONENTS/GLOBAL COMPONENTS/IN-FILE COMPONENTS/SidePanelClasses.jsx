import React from "react";
import { NavLink } from "react-router-dom";

export default function SidePanelClasses({ data }) {
  const bgColor = "#E1E6E2";
  return (
    <NavLink
      to={`/class/${data.class_id}`}
      className="custom-panel-bars flex-col items-start gap-1
        laptop-l:text-base laptop-l:w-full 
        4k:text-3xl 4k:px-16"
      style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
    >
      <div className="capitalize">{data.class_name}</div>
      <div
        className="font-Work font-light capitalize
            4k:text-3xl"
      >
        {data.class_handler}
      </div>
    </NavLink>
  );
}
