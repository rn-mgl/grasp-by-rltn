import React from "react";
import HeaderMoreInfo from "../../COMPONENTS/GLOBAL COMPONENTS/HeaderMoreInfo";
import { AiOutlineMore } from "react-icons/ai";
import { Buffer } from "buffer";

export default function PostHeader(props) {
  const user = parseInt(localStorage.getItem("curr"));

  return (
    <div className="flex items-center">
      <div className="mr-auto custom-flex gap-3">
        <div
          className={`${
            !props.post.user_image && " bg-pr-blu"
          } w-16 h-16 rounded-full bg-center bg-cover`}
          style={
            props.post.user_image && {
              backgroundImage: `url(${Buffer.from(props.post.user_image).toString()})`,
            }
          }
        ></div>
        <div>
          <div className="font-Poppins font-medium text-lg">{` ${
            props.post.posted_by === user
              ? "You"
              : `${props.post.user_name} ${props.post.user_surname}`
          } `}</div>
          <div className="font-Work font-light">{props.post.post_created}</div>
        </div>
      </div>
      <div>
        {props.post.posted_by === user && (
          <div>
            <AiOutlineMore
              className="scale-125 cursor-pointer"
              onClick={props.handleActiveHeader}
            />
            {props.activeHeader === props.post.post_id && (
              <HeaderMoreInfo
                targetUser={props.post.posted_by}
                handleDeletePost={props.handleDeletePost}
                handlePostToEdit={props.handlePostToEdit}
                type={"post"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
