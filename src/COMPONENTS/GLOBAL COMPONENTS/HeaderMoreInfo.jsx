import React from "react";

export default function HeaderMoreInfo(props) {
  const user = parseInt(localStorage.getItem("curr"));
  return (
    <div className="absolute -translate-x-40 bg-pr-wht p-3 rounded-lg w-40 shadow-lg">
      <div className="custom-flex flex-col font-Poppins text-center">
        {props.isArchived ? (
          <div
            onClick={props.restoreClass}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Restore
          </div>
        ) : (
          props.type !==
          (
            <div
              onClick={props.archiveClass}
              className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
            >
              Archive
            </div>
          )
        )}

        {props.targetUser === user && (
          <div
            onClick={props.handleDeletePost}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Delete
          </div>
        )}
        {props.targetUser === user && (
          <div
            onClick={props.handlePostToEdit}
            className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          >
            Edit
          </div>
        )}
      </div>
    </div>
  );
}
