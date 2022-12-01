import React from "react";

export default function TaskPreviewBarName({ task }) {
  return (
    <div className="mr-auto">{`${
      task?.assigned_by_name
        ? task?.assigned_by_name
        : task?.assigned_to_name
        ? task?.assigned_to_name
        : "-"
    } ${
      task?.assigned_by_surname
        ? task?.assigned_by_surname
        : task?.assigned_to_surname
        ? task?.assigned_to_surname
        : "-"
    }`}</div>
  );
}
