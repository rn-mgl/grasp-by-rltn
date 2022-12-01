import React from "react";
import { NavLink } from "react-router-dom";
export default function ArchivedTasksPreviewBar(props) {
  return (
    <div className="flex flex-col w-full gap-5">
      {props.task.map((task) => {
        return (
          <NavLink
            className="custom-light-border flex flex-col hover:shadow-md gap-3 text-pr-blk  text-sm p-3 rounded-lg w-full
                    tablet:text-base"
            key={task.task_id}
            to={`/class/${task.class_id}/archived-tasks/${task.task_id}`}
          >
            <div className="flex justify-center font-Poppins ">
              <div className="mr-auto font-semibold break-all">{task.task_main_topic}</div>
              <div>
                {task.task_submission_date ? task.task_submission_date : <div>No Deadline</div>}
              </div>
            </div>
            <div className="font-Work flex">
              <div className="mr-auto">{`${task.assigned_by_name} ${task.assigned_by_surname}`}</div>
              <div>
                <div className="text-gray-400">Archived</div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
