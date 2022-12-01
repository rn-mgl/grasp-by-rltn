import React from "react";
import { NavLink } from "react-router-dom";
import { Buffer } from "buffer";

export default function PeopleBarPreview(props) {
  const user = parseInt(localStorage.getItem("curr"));

  return (
    <div
      className="flex flex-col w-11/12 gap-5
                tablet:w-10/12
                laptop-s:w-8/12"
    >
      {props.people.map((people) =>
        people.class_handler === user ? (
          <NavLink
            key={people.user_id}
            to={`/class/${props.class_id}/people/${people.user_id}`}
            className="custom-light-border flex items-center hover:shadow-md gap-3 text-pr-blk  text-sm p-3 rounded-lg w-full
          tablet:text-base"
          >
            <div
              className={`${
                !people.user_image && "bg-gradient-to-r from-pr-grn to-pr-ylw"
              }  custom-flex bg-cover bg-center bg-pr-gry rounded-full w-16 h-16 `}
              style={{
                backgroundImage:
                  people.user_image && `url(${Buffer.from(people.user_image).toString()})`,
              }}
            ></div>

            <div>
              <div className="font-Poppins font-semibold">
                {`${people.user_name} ${people.user_surname}`}
                {people.class_handler === people.user_id && " | Class Handler"}
              </div>
              <div className="font-Work">{people.user_email}</div>
            </div>
          </NavLink>
        ) : (
          <div
            key={people.user_id}
            className="custom-light-border flex items-center gap-3 text-pr-blk  text-sm p-3 rounded-lg w-full
tablet:text-base"
          >
            <div
              className={`${
                !people.user_image && "bg-gradient-to-r from-pr-grn to-pr-ylw"
              } custom-flex bg-cover bg-center bg-pr-gry rounded-full w-16 h-16 `}
              style={{
                backgroundImage:
                  people.user_image && `url(${Buffer.from(people.user_image).toString()})`,
              }}
            ></div>

            <div>
              <div className="font-Poppins font-semibold">
                {`${people.user_name} ${people.user_surname}`}
                {people.class_handler === people.user_id && " | Class Handler"}
              </div>
              <div className="font-Work">{people.user_email}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
