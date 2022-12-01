import React from "react";

export default function CountCard(props) {
  return (
    <div
      className={`bg-gradient-to-r ${props.bgColor} w-full rounded-lg p-3 custom-flex flex-col
                laptop-s:p-5
                laptop-l:h-full
                `}
      style={{ height: "100%" }}
    >
      <div
        className="font-Poppins font-bold text-3xl
                    laptop-l:text-5xl"
      >
        {props.count}
      </div>
      <div
        className="font-Work
                    laptop-l:text-lg"
      >
        {props.label}
      </div>
    </div>
  );
}
