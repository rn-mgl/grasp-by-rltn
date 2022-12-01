import React from "react";
import { Buffer } from "buffer";

export default function StudentsToGradePreviewBar(props) {
  return (
    <div className="w-full">
      <div
        onClick={() => props.handleStudentSelected(props.student.user_id)}
        className={`${
          props.studentSelected === props.student.user_id &&
          "custom-light-border border-2 border-pr-grn"
        } flex bg-pr-wht rounded-lg p-3 h-28 w-full cursor-pointer`}
      >
        <div className="custom-flex gap-4 items-start mr-auto">
          <div
            className={`${
              !props.student.student_image && "bg-gradient-to-r from-pr-grn to-pr-ylw"
            } rounded-full w-12 h-12 bg-cover bg-center`}
            style={
              props.student.student_image && {
                backgroundImage: `url(${Buffer.from(props.student.student_image).toString()})`,
              }
            }
          ></div>
          <div className="custom-flex flex-col items-start font-Poppins text-sm">
            <div
              className="font-semibold text-sm
                          laptop-s:text-base"
            >
              {props.student.student_name}
            </div>
            <div>{props.student.student_email}</div>
          </div>
        </div>
        <div className="mt-auto font-Work font-light">
          {props.student.student_task_points || props.student.student_task_points === 0
            ? `${props.student.student_task_points}/${props.student.task_points}`
            : `__ /${props.student.task_points}`}
        </div>
      </div>
      {props.student && props.student.length > 1 && <div className="custom-divider w-10/12" />}
    </div>
  );
}
