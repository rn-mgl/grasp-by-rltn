import React from "react";
import ClassButton from "../../../COMPONENTS/CLASSES COMPONENTS/ClassButton";

export default function CompileClassButtons(props) {
  return (
    <div
      className="custom-flex gap-5 mx-auto
            tablet:justify-start tablet:w-11/12"
    >
      <ClassButton
        label={"Add Class"}
        bgColor={"bg-pr-blk"}
        txtColor={"text-pr-wht"}
        handleCanAddContent={props.handleCanAddClass}
      />
      <ClassButton
        label={"Join Class"}
        bgColor={"bg-pr-gry"}
        txtColor={"text-pr-blk"}
        handleCanAddContent={props.handleCanJoinClass}
      />
    </div>
  );
}
