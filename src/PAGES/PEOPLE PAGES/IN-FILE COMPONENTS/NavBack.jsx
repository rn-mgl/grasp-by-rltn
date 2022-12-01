import React from "react";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function NavBack(props) {
  return (
    <NavLink
      className="capitalize ml-5 flex items-center gap-2 font-Poppins hover:underline underline-offset-4 mr-auto font-light
              tablet:ml-5
              laptop-s:hidden"
      to={`/class/${props.class_id}`}
    >
      <BiArrowBack /> Back
    </NavLink>
  );
}
