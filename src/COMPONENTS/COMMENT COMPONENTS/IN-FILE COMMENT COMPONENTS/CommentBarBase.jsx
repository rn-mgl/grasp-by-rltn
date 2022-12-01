import React from "react";
import CommentBarHeader from "../IN-FILE COMMENT COMPONENTS/CommentBarHeader";
import CommentMoreInfo from "../CommentMoreInfo";

import { AiOutlineMore } from "react-icons/ai";
import { Buffer } from "buffer";

export default function CommentBarBase(props) {
  const user = parseInt(localStorage.getItem("curr"));
  const commenterImage = props.commentData?.user_image
    ? Buffer.from(props.commentData?.user_image).toString()
    : undefined;

  return (
    <div key={props.commentData?.comment_id} className="custom-light-border bg-gray-50">
      <div className="flex items-center">
        <CommentBarHeader commentData={props.commentData} commenterImage={commenterImage} />
        <div>
          {props.commentData?.comment_id === props.activeCommentHeader && (
            <CommentMoreInfo
              commentData={props.commentData}
              handleDeleteComment={props.handleDeleteComment}
              handleCommentToEdit={() => props.handleCommentToEdit(props.commentData?.comment_id)}
            />
          )}
          {props.commentData?.comment_from === user && (
            <AiOutlineMore
              onClick={() => props.handleActiveCommentHeader(props.commentData?.comment_id)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="custom-divider my-3"></div>
      <div className=" font-Work text-justify break-words whitespace-pre-wrap w-11/12 ml-auto">
        {props.commentData?.comment_text}
      </div>
    </div>
  );
}
