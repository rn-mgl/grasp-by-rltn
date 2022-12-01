import React from "react";

export default function CommentMoreInfo(props) {
  return (
    <div className="absolute -translate-x-40 -translate-y-9 bg-pr-wht p-3 rounded-lg w-40 shadow-lg">
      <div className="custom-flex flex-col font-Poppins text-center">
        <div
          className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
          onClick={() =>
            props.handleDeleteComment(props.commentData.post_id, props.commentData.comment_id)
          }
        >
          Delete
        </div>
        <div
          onClick={props.handleCommentToEdit}
          className="hover:bg-pr-gry w-full rounded-lg p-1 cursor-pointer"
        >
          Edit
        </div>
      </div>
    </div>
  );
}
