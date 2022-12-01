import React from "react";

import TasksPreviewBar from "../../../COMPONENTS/SINGLE TASK COMPONENTS/TasksPreviewBar";
import MessagePage from "../../../COMPONENTS/ERROR COMPONENTS/MessagePage";

export default function SinglePeopleTaskBase(props) {
  return (
    <div className="w-full custom-flex flex-col gap-3 ">
      <div
        className={`uppercase mr-auto font-Poppins font-semibold bg-gradient-to-r from-pr-${props.fromColor} to-pr-${props.toColor}  bg-clip-text text-transparent
              tablet:text-lg
              laptop-s:text-xl`}
      >
        {props.label}
      </div>
      {props.ongoingTask?.length > 0 ? (
        <TasksPreviewBar task={props.ongoingTask} class_id={props.class_id} />
      ) : (
        <MessagePage
          header={`No ${props.label} Tasks`}
          body={`your ${props.label} tasks will be displayed here`}
          fetch={props.fetchTask}
          footer="Try To Get Tasks"
        />
      )}
    </div>
  );
}
