import React from "react";
import { NavLink } from "react-router-dom";
import { BsPin } from "react-icons/bs";
import { convertTime } from "../../FUNCTIONS/dateFunction";

export default function TaskPostPreview(props) {
  const taskPostText = `${props.post.user_name} ${props.post.user_surname} | ${props.post.post_main_topic}`;
  return (
    <NavLink
      className="flex items-center"
      to={`/class/${props.post.class_id}/tasks/${props.post.post_id}`}
    >
      <div className="mr-auto flex items-center gap-3">
        <BsPin size={"1.6rem"} />
        <div>
          <div
            className="font-Poppins font-normal text-lg gap-2
                        tablet:flex"
          >
            New task of
            <div className="tablet:hidden font-medium">
              {taskPostText.length > 8 ? `${taskPostText.slice(0, 8)}...` : taskPostText}
            </div>
            <div className="mobile-s:hidden mobile-m:hidden mobile-l:hidden tablet:flex font-medium">
              {taskPostText}
            </div>
          </div>
          <div className="font-Work font-light">{convertTime(props.post.post_created)}</div>
        </div>
      </div>
    </NavLink>
  );
}
