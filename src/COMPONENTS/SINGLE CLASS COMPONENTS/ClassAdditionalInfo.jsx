import React from "react";
import { BiCopy } from "react-icons/bi";

export default function ClassAdditionalInfo(props) {
  return (
    <div
      className={`bg-pr-wht w-11/12 bg-cover p-5 rounded-lg flex
            laptop-s:h-20
            laptop-l:w-9/12 
            4k:h-64`}
    >
      <div
        className="font-Poppins text-pr-blk text-xs font-medium custom-flex flex-col gap-5 w-full
            tablet:flex-row tablet:gap-16 tablet:text-sm
              4k:text-6xl"
      >
        <div className="text-center custom-flex gap-3 w-full">
          <BiCopy
            size={"1.3rem"}
            className="cursor-pointer"
            onClick={() => {
              props.handleCopyClassCode(props.classData.class_code);
              props.handleMessagePop("Class Code Copied");
            }}
          />
          <div className="font-semibold">Class Code</div>
          <div className="font-light">{props.classData.class_code}</div>
        </div>

        <div className="text-center custom-flex gap-3 w-full">
          <div className="font-semibold">Class Section</div>
          <div className="font-light">
            {props.classData.class_section ? props.classData.class_section : "No Section"}
          </div>
        </div>

        <div className="text-center custom-flex gap-3 w-full">
          <div className="font-semibold">Class Subject</div>
          <div className="font-light">
            {props.classData.class_subject ? props.classData.class_subject : "No Subject"}
          </div>
        </div>
      </div>
    </div>
  );
}
