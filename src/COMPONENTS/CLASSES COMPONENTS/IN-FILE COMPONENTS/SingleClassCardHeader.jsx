import React from "react";
import { NavLink } from "react-router-dom";

export default function SingleClassCardHeader(props) {
  return (
    <div className="mr-auto">
      <NavLink
        to={`/class/${props.data.class_id}`}
        className="hover:underline underline-offset-4 decoration-pr-wht"
      >
        {/* class name */}
        <div
          className="font-Poppins font-semibold capitalize text-pr-wht text-lg
    laptop-l:text-xl
    4k:text-4xl"
        >
          <div>{props.data.class_name}</div>
        </div>

        {/* class handler */}
        <div
          className="font-Work font-light text-pr-wht
    laptop-l:text-base
    4k:text-3xl"
        >
          {`${props.data.user_name} ${props.data.user_surname}`}
        </div>

        {/* class handler image */}
        <div
          className={`${
            !props.data.user_image && "bg-gradient-to-r from-pr-grn to-pr-ylw "
          } w-12 h-12 rounded-full bg-center bg-cover absolute hidden 
      tablet:translate-x-40 tablet:-translate-y-2 tablet:flex
      laptop-s:translate-x-52 laptop-s:-translate-y-4 laptop-s:flex laptop-s:w-16 laptop-s:h-16`}
          style={
            props.data.user_image && {
              backgroundImage: `url(${props.handlerImage})`,
            }
          }
        />
      </NavLink>
    </div>
  );
}
