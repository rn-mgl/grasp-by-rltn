import React from "react";
import { convertTime } from "../../../FUNCTIONS/dateFunction";

export default function TaskPreviewBarDeadline({ task }) {
  return (
    <div className="flex justify-center bg-white font-Poppins ">
      <div className="mr-auto font-semibold">{task?.task_main_topic}</div>
      <div>
        {task?.task_submission_date ? (
          convertTime(task?.task_submission_date)
        ) : (
          <div>No Deadline</div>
        )}
      </div>
    </div>
  );
}
