import React from "react";
import { AiOutlineComment } from "react-icons/ai";

export default function PostIcons(props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="custom-divider"></div>
      <div className="flex gap-8 font-Work">
        <button onClick={props.handleCommentIcon}>
          <AiOutlineComment size={"1.3rem"} />
        </button>
      </div>
      <div className="custom-divider"></div>
    </div>
  );
}
