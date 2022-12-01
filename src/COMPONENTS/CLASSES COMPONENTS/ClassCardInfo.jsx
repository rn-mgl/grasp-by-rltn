import React from "react";

export default function ClassCardInfo(props) {
  const user = parseInt(localStorage.getItem("curr"));

  return (
    <div
      className="absolute z-20 -translate-x-44 -translate-y-16 bg-pr-wht p-3 rounded-lg w-40 shadow-lg
                tablet:-translate-x-40 tablet:translate-y-0"
    >
      <div className="custom-flex flex-col font-Poppins text-center">
        {props.isArchived && props.classData.class_handler === user ? (
          <div
            onClick={props.restoreClass}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Restore
          </div>
        ) : (
          props.classData.class_handler === user && (
            <div
              onClick={props.archiveClass}
              className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
            >
              Archive
            </div>
          )
        )}
        {props.classData.class_handler !== user && (
          <div
            onClick={() => props.handleUnenroll(props.classData.class_id)}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Unenroll
          </div>
        )}

        {props.classData.class_handler === user && props.isArchived && (
          <div
            onClick={props.handleDeleteClass}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Delete
          </div>
        )}
        {props.classHandler === user && (
          <div
            onClick={props.handleEditClass}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Edit
          </div>
        )}
      </div>
    </div>
  );
}
