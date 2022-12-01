import React from "react";
import { NavLink } from "react-router-dom";

export default function TaskHeaderInfo(props) {
  return (
    <div className="absolute -translate-x-40  bg-pr-wht p-3 rounded-lg w-40 shadow-lg">
      <div className="custom-flex flex-col font-Poppins text-center">
        <div className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer">
          {props.isArchived ? (
            <div onClick={props.openTask}>Assign</div>
          ) : (
            <div onClick={props.archiveTask}>Archive</div>
          )}
        </div>
        {props.isArchived ? (
          <div
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
            onClick={props.handleDeleteTask}
          >
            Delete
          </div>
        ) : (
          ""
        )}

        <NavLink
          to={`/class/${props.class_id}/tasks/${props.task_id}/edit`}
          className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
        >
          Edit
        </NavLink>
      </div>
    </div>
  );
}
