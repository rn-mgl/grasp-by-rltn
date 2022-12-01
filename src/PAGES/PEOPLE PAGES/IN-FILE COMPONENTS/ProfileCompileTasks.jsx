import React from "react";

import ProfileTasks from "../../../COMPONENTS/PROFILE COMPONENTS/ProfileTasks";
import MessagePage from "../../../COMPONENTS/ERROR COMPONENTS/MessagePage";

export default function ProfileCompileTasks(props) {
  return (
    <div className="w-11/12 custom-flex gap-5 flex-col rounded-lg shadow-md mb-10 bg-white">
      <div className="font-Poppins font-medium w-full p-5 pb-0">All Tasks</div>
      <div
        className="w-full custom-flex flex-col gap-3 mb-5
              tablet:p-5 tablet:m-0"
      >
        {props.tasksData?.length > 0 ? (
          props.tasksData?.map((taskData) => {
            return <ProfileTasks task={taskData} key={taskData.task_id} />;
          })
        ) : (
          <MessagePage
            header={"No Tasks"}
            body={"all of your tasks will be displayed here"}
            fetch={props.fetchUserData}
            footer={"Try To Get Tasks"}
          />
        )}
      </div>
    </div>
  );
}
