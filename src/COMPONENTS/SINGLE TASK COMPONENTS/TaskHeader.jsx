import React from "react";

export default function TaskHeader(props) {
  return (
    <div className="flex flex-col gap-5 font-Poppins">
      <div
        className="flex flex-col 
                  mobile-s:items-start
                  tablet:flex-row tablet:items-center"
      >
        <div className="mr-auto text-5xl font-bold uppercase bg-gradient-to-r from-pr-blu to-pr-grn text-transparent bg-clip-text break-all">
          {props.topic}
        </div>
        <div className="font-light">
          {props.submission_date ? props.submission_date : "No Deadline"}
        </div>
      </div>

      <div
        className="flex flex-col font-normal 
                   mobile-s:items-start
                  tablet:flex-row tablet:items-center"
      >
        <div className="mr-auto font-semibold text-lg">{props.assigned_by}</div>
        <div className="font-light">
          {props.student_points || props.student_points === 0
            ? `${props.student_points}/${props.task_points}`
            : props.task_points}
        </div>
      </div>
    </div>
  );
}
