import React from "react";
import { FaTasks } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineHome, MdOutlineSchool } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function SidePanelEssentials() {
  const user = parseInt(localStorage.getItem("curr"));
  const bgColor = "#E1E6E2";
  return (
    <div>
      {/* home tag */}
      <NavLink
        to="/home"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
        className="custom-panel-bars 
            laptop-l:text-base laptop-l:w-full 
            mobile-s:flex"
      >
        <MdOutlineHome size={"1.5rem"} className={"laptop-l:scale-110"} />
        <div>Home</div>
      </NavLink>

      {/* profile tag */}
      <NavLink
        className="custom-panel-bars
            laptop-l:text-base laptop-l:w-full 
            4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
        to={`/profile/${user}`}
      >
        <BsPersonCircle
          className="laptop-l:scale-110
              4k:scale-[150%]"
          size={"1.3rem"}
        />
        <div>Profile</div>
      </NavLink>

      {/* classes tag */}
      <NavLink
        to="/classes"
        className="custom-panel-bars
            laptop-l:text-base laptop-l:w-full 
             4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
      >
        <MdOutlineSchool
          className="laptop-l:scale-110
              4k:scale-[150%]"
          size={"1.5rem"}
        />
        <div>Classes</div>
      </NavLink>

      {/* archived classes tag */}
      <NavLink
        to="/archived-classes"
        className="custom-panel-bars
  laptop-l:text-base laptop-l:w-full 
             4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
      >
        <BiArchiveIn
          className="laptop-l:scale-110
              4k:scale-[150%]"
          size={"1.5rem"}
        />
        <div>Archived Classes</div>
      </NavLink>

      {/* tasks tag */}
      <NavLink
        to="/tasks/ongoing"
        className="custom-panel-bars 
  laptop-l:text-base laptop-l:w-full 
          4k:text-3xl 4k:px-16"
        style={({ isActive }) => (isActive ? { background: bgColor } : undefined)}
      >
        <FaTasks
          className="laptop-l:scale-110 
              4k:scale-[150%]"
          size={"1.1rem"}
        />
        <div>Tasks</div>
      </NavLink>
    </div>
  );
}
