import React from "react";

import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function NavBack(props) {
  return (
    <NavLink
      className="capitalize flex items-center gap-2 font-Poppins text-xl underline underline-offset-4 mr-auto font-light"
      to={`/class/${props.class_id}`}
    >
      <BiArrowBack /> {props.task?.class_name}
    </NavLink>
  );
}
