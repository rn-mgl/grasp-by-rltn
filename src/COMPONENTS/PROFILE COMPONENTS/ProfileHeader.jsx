import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Buffer } from "buffer";

export default function ProfileHeader(props) {
  return (
    <div className="w-11/12 h-auto custom-flex flex-col mt-10 rounded-lg pb-5 shadow-md bg-white">
      <div className="w-full">
        <div className="bg-gradient-to-r from-pr-grn to-pr-ylw h-28 rounded-t-lg "></div>
        <div
          className={`${
            !props.userData.user_image && "bg-gradient-to-b from-gray-100 to-gray-400"
          } bg-white rounded-full h-28 w-28 
        absolute left-2/4 -translate-x-2/4 -translate-y-2/4 border-white border-4 bg-center bg-cover`}
          style={
            props.userData.user_image && {
              backgroundImage: `url('${Buffer.from(props.userData.user_image).toString()}')`,
            }
          }
        ></div>
      </div>

      <div className="mt-16 text-center">
        <div className="font-Poppins font-medium">{`${props.userData.user_name} ${props.userData.user_surname}`}</div>
        <div className="font-Work font-light text-sm">{props.userData.user_email}</div>
      </div>
      <AiOutlineEdit
        onClick={props.handleCanEditProfile}
        className="cursor-pointer mt-3 hover:opacity-50
                  laptop-s:ml-auto laptop-s:mx-5 laptop-s:scale-125"
      />
    </div>
  );
}
