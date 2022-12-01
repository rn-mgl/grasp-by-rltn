import React from "react";

// comment bar components
import EditComment from "./EditComment";
import CommentBarBase from "./IN-FILE COMMENT COMPONENTS/CommentBarBase";

export default function CommentBar(props) {
  return (
    // ternary to avoid continuous rendering of comment edit
    props.commentData?.post_id === props.post_id &&
    (props.commentToEdit === props.commentData?.comment_id ? (
      <EditComment
        handleCommentToEdit={() => props.handleCommentToEdit(props.commentData?.comment_id)}
        post_id={props.post_id}
        fetchComments={props.fetchComments}
        comment_id={props.commentData.comment_id}
        type={props.type}
      />
    ) : (
      <CommentBarBase
        commentData={props.commentData}
        handleCommentToEdit={props.handleCommentToEdit}
        activeCommentHeader={props.activeCommentHeader}
        handleActiveCommentHeader={props.handleActiveCommentHeader}
        handleDeleteComment={props.handleDeleteComment}
      />
    ))
  );
}
