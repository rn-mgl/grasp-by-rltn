import React from "react";

import { NavLink } from "react-router-dom";

export default function ProfileTasks({ task }) {
  return (
    <div className="flex flex-col w-full gap-5">
      <NavLink
        className="custom-light-border rounded-none border-x-0  flex flex-col gap-3 text-pr-blk  text-sm p-3 w-full
                    hover:bg-gradient-to-r hover:from-pr-grn hover:to-pr-blu hover:text-white
                    tablet:border-x-[1px] tablet:rounded-lg
                    tablet:text-base"
        key={task.task_id}
        to={`/class/${task.class_id}/tasks/${task.task_id}`}
      >
        <div className="flex justify-center font-Poppins ">
          <div className="mr-auto font-semibold">{task.task_main_topic}</div>
          <div>
            {task.task_submission_date ? task.task_submission_date : <div>No Deadline</div>}
          </div>
        </div>
        <div className="font-Work flex font-light">
          <div className="mr-auto">{`${task.user_name} ${task.user_surname}`}</div>
          <div>
            {task.student_late && !task.student_submitted ? (
              <div>Late</div>
            ) : !task.student_late && !task.student_submitted ? (
              <div>Ongoing</div>
            ) : (
              <div>{task.student_late ? "Done Late" : "Done"}</div>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
}
