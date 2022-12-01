import React from "react";

export default function TaskPreviewBarStatus({ task }) {
  return (
    <div>
      {task?.student_late && !task?.student_submitted ? (
        <div className="text-pr-red">Late</div>
      ) : !task?.student_late && !task?.student_submitted ? (
        <div className="text-pr-grn">Ongoing</div>
      ) : (
        <div className="text-pr-blu">{task?.student_late ? "Done Late" : "Done"}</div>
      )}
    </div>
  );
}
