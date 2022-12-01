import React from "react";
import { NavLink } from "react-router-dom";

export default function UpcomingActivities(props) {
  return (
    <React.Fragment>
      <NavLink
        className="w-full p-3 bg-gray-100 hover:text-pr-grn self-start rounded-lg first-letter
                  laptop-s:hidden"
        to={`/class/${props.class_id}/tasks/`}
      >
        <div
          className="font-Poppins font-medium text-center
                    4k:text-xl"
        >
          Tasks
        </div>
      </NavLink>
      <div
        className="w-full p-3 bg-gray-100 self-start rounded-lg
                mobile-s:hidden
                laptop-s:block"
      >
        <div
          className="font-Poppins font-medium text-center
                    4k:text-xl"
        >
          {props.activityPreview.length > 0 ? "Ongoing Tasks" : "No Tasks"}
        </div>
        {props.activityPreview.map((act) => {
          return (
            <div
              className="mobile-s:hidden mt-3
                      tablet:flex"
              key={act.task_id}
            >
              <NavLink
                className="font-Work hover:text-pr-grn"
                to={`/class/${props.class_id}/tasks/${act.task_id}`}
              >
                {act.task_main_topic}
              </NavLink>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
