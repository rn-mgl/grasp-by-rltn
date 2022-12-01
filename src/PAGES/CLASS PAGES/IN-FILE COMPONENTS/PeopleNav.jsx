import React from "react";
import { NavLink } from "react-router-dom";

export default function PeopleNav(props) {
  return (
    <NavLink
      className="w-full p-3 bg-gray-100 self-start rounded-lg first-letter font-Poppins font-medium text-center
        4k:text-xl
        laptop-s:hidden"
      to={`/class/${props.class_id}/people`}
    >
      People
    </NavLink>
  );
}
