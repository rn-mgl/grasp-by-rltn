import React from "react";
import { NavLink } from "react-router-dom";

export default function ProfileClasses({ classData }) {
  return (
    <NavLink
      to={`/class/${classData.class_id}`}
      className="w-full py-3 px-5 rounded-none border-x-0 custom-light-border
                hover:bg-gradient-to-r hover:from-pr-red hover:to-pr-orng hover:text-white  
                tablet:w-44 tablet:border-x-[1px] tablet:rounded-lg tablet:custom-flex tablet:flex-col
                laptop-s:w-64 h-32"
    >
      <div
        className="font-Poppins font-medium text-center
                  laptop-s:text-lg"
      >
        {classData.class_name}
      </div>
      <div className="font-Work font-light text-center text-sm invert-0">{`${classData.class_handler_name} ${classData.class_handler_surname}`}</div>
      {classData.length > 1 && <div className="custom-divider"></div>}
    </NavLink>
  );
}
