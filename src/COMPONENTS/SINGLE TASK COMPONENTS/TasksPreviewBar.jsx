import React from "react";
import { NavLink } from "react-router-dom";
import TaskPreviewBarDeadline from "./IN-FILE COMPONENTS/TaskPreviewBarDeadline";
import TaskPreviewBarName from "./IN-FILE COMPONENTS/TaskPreviewBarName";
import TaskPreviewBarStatus from "./IN-FILE COMPONENTS/TaskPreviewBarStatus";

export default function TasksPreviewBar(props) {
  const user = parseInt(localStorage.getItem("curr"));
  const previewBarStyles =
    "custom-light-border flex flex-col hover:shadow-md gap-3 text-pr-blk text-sm p-3 rounded-lg w-full tablet:text-base";
  return (
    <div className="flex flex-col  w-full gap-5">
      {props.task.map((task) =>
        user === task?.user_id ? (
          <NavLink
            className={previewBarStyles}
            key={task?.student_id}
            to={
              user === props.classHandler
                ? `/class/${task?.class_id}/to-grade/${task?.task_id}`
                : `/class/${task?.class_id}/tasks/${task?.task_id}`
            }
          >
            <TaskPreviewBarDeadline task={task} />
            <div className="font-Work flex">
              <TaskPreviewBarName task={task} />
              <TaskPreviewBarStatus task={task} />
            </div>
          </NavLink>
        ) : (
          <div className={previewBarStyles} key={task.task_id}>
            <TaskPreviewBarDeadline task={task} />
            <div className="font-Work flex">
              <TaskPreviewBarName task={task} />
              <TaskPreviewBarStatus task={task} />
            </div>
          </div>
        )
      )}
    </div>
  );
}
