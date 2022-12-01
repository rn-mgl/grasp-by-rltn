import React from "react";
import { Buffer } from "buffer";

export default function PeopleHeader(props) {
  return (
    <div
      className="w-full h-full
                tablet:w-fit
                laptop-s:w-4/12"
    >
      <div className="p-5 custom-flex flex-col gap-5 bg-pr-wht w-full rounded-lg shadow-md">
        <div
          className={`${
            !props.peopleData?.user_image && "bg-gradient-to-r from-pr-grn to-pr-ylw "
          } w-[5.5rem] h-[5.5rem] rounded-full bg-center bg-cover`}
          style={
            props.peopleData?.user_image && {
              backgroundImage: `url(${Buffer.from(props.peopleData?.user_image).toString()})`,
            }
          }
        />
        <div className="custom-flex flex-col">
          <div className="font-Poppins font-semibold">{`${props.peopleData?.user_name} ${props.peopleData?.user_surname}`}</div>
          <div className="font-Work font-light">
            {props.peopleData?.student_joined && (
              <div>
                <div>Joined the class on</div>
                <div>{props.peopleData?.student_joined}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
