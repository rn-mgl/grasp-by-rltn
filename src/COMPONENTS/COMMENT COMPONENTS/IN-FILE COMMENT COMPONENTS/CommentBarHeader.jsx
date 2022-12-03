import React from "react";
import { convertTime } from "../../../FUNCTIONS/dateFunction";

export default function CommentBarHeader(props) {
  const user = parseInt(localStorage.getItem("curr"));
  return (
    <div className="mr-auto custom-flex gap-3">
      <div
        className={`${
          !props.commentData?.user_image && " bg-pr-blu"
        } w-12 h-12 rounded-full bg-center bg-cover`}
        style={
          props.commentData?.user_image && {
            backgroundImage: `url(${props.commenterImage})`,
          }
        }
      ></div>
      <div>
        <div className="font-Poppins font-medium text-md break-words">
          {props.commentData?.comment_from === user
            ? "You"
            : `${props.commentData?.user_name} ${props.commentData?.user_surname}`}
        </div>
        <div
          className="font-Work font-light text-xs
                "
        >
          {convertTime(props.commentData?.comment_created)}
        </div>
      </div>
    </div>
  );
}
