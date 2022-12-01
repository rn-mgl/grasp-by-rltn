import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function ClassButton(props) {
  return (
    <div
      onClick={props.handleCanAddContent}
      className={`custom-btn custom-flex gap-2 p-3 ${props.bgColor} ${props.txtColor} w-32 text-sm
                  tablet:text-base tablet:w-36`}
    >
      <IoIosAddCircleOutline
        size="1.3rem"
        color={props.txtColor}
        className="laptop-s:scale-105
                laptop-l:scale-125"
      />
      <div className="font-Poppins">{props.label}</div>
    </div>
  );
}
