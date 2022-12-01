import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function ClassHeader(props) {
  return (
    <div
      className={`${
        !props.classImage && "bg-gradient-to-r from-pr-blu to-pr-grn"
      } w-11/12 bg-cover p-5 rounded-lg flex
                laptop-s:h-40
                laptop-l:w-9/12 laptop-l:h-48
                4k:h-64`}
      style={{
        backgroundImage: props.classImage && `url(${props.classImage})`,
        backgroundSize: "contain",
      }}
    >
      <div className="mr-auto">
        <div
          className="font-Poppins text-pr-wht text-xl capitalize font-medium
                  tablet:text-2xl
                  laptop-l:text-4xl
                  4k:text-6xl"
        >
          {props.classData.class_name}
        </div>

        <div
          className="font-Work text-pr-wht text-lg font-light mt-2
                    tablet:text-xl
                    laptop-l:text-2xl
                    4k:text-3xl"
        >
          {`${props.classData.user_name} ${props.classData.user_surname}`}
        </div>
      </div>

      <AiOutlineInfoCircle
        className="mt-auto cursor-pointer
                  tablet:mt-0"
        onClick={props.handleAdditionalClassInfo}
        size={"1.3rem"}
        color="white"
      />
    </div>
  );
}
