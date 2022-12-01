import React from "react";

export default function SingleTaskToGradeHeaderMessage(props) {
  return (
    <div
      className="flex flex-col gap-3 font-Poppins font-normal text-base w-full
            tablet:gap-0 tablet:w-8/12 tablet:flex-row
            laptop-s:w-9/12
            laptop-l:w-10/12"
    >
      <div
        className="font-medium flex flex-col
              tablet:flex-row tablet:gap-3 tablet:w-full"
      >
        {props.task?.student_submission_date ? (
          <div
            className="text-center
                        tablet:text-left"
          >
            <div className="font-normal">Date Submitted</div>
            <div>{props.task?.student_submission_date}</div>
          </div>
        ) : (
          <div className="font-normal">Student is still doing the task</div>
        )}
      </div>

      <div
        className="font-medium custom-flex w-full
              tablet:w-9/12 tablet:items-end tablet:justify-end"
      >
        <div>
          {props.task?.student_late && !props.task?.student_submitted ? (
            <div className="text-pr-red">Late</div>
          ) : !props.task?.student_late && !props.task?.student_submitted ? (
            <div className="text-pr-grn">Ongoing</div>
          ) : (
            <div className="text-pr-blu">
              {props.task?.student_late ? "Done Late" : "Done On Time"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
