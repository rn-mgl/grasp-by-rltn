import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../IMAGES/GRASP LOGO.png";

export default function NavBarLogoLink() {
  const token = localStorage.getItem("token");
  const logoPath = token ? "/home" : "/";
  return (
    <NavLink
      className={`absolute top-10 left-2/4 -translate-x-2/4 -translate-y-2/4 
              laptop-s:left-40
              4k:left-16 4k:top-11`}
      to={logoPath}
    >
      <img
        src={Logo}
        alt="logo"
        className="w-24
                laptop-l:w-32
                4k:w-60"
      />
    </NavLink>
  );
}
