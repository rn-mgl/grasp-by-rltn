import React from "react";
import { NavLink } from "react-router-dom";

export default function TasksToGradePreviewBar(props) {
  return (
    <div
      className="flex flex-col items-center w-full gap-5
                tablet:flex-row"
    >
      {props.task.map((task) => (
        <NavLink
          className="custom-light-border cursor-pointer flex  hover:shadow-md gap-3 text-pr-blk  text-sm p-3 rounded-lg w-full
                    tablet:text-base tablet:flex-col tablet:w-4/12"
          key={task.task_id}
          to={`/class/${task.class_id}/to-grade/${task.task_id}`}
        >
          <div className="flex justify-center bg-white font-Poppins mr-auto">
            <div className="font-semibold">{task.task_main_topic}</div>
          </div>
          <div className="font-Work flex">
            <div>
              {task.student_late && !task.student_submitted ? (
                <div className="text-pr-red">Late</div>
              ) : !task.student_late && !task.student_submitted ? (
                <div className="text-pr-grn">Ongoing</div>
              ) : (
                <div className="text-pr-blu">{task.student_late ? "Done Late" : "Done"}</div>
              )}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
