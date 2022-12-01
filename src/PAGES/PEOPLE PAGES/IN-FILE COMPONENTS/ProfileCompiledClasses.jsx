import React from "react";

import ProfileClasses from "../../../COMPONENTS/PROFILE COMPONENTS/ProfileClasses";
import MessagePage from "../../../COMPONENTS/ERROR COMPONENTS/MessagePage";

export default function ProfileCompiledClasses(props) {
  return (
    <div className="w-11/12 custom-flex gap-5 flex-col rounded-lg shadow-md bg-white">
      <div className="font-Poppins font-medium w-full p-5 pb-0">Enrolled Classes</div>
      <div
        className="w-full custom-flex flex-col gap-3 mb-5 
              tablet:justify-start tablet:p-5 tablet:m-0 tablet:flex-row"
      >
        {props.classesData?.length > 0 ? (
          props.classesData?.map((classData) => {
            return <ProfileClasses classData={classData} key={classData.class_id} />;
          })
        ) : (
          <MessagePage
            header={"No Enrolled Classes"}
            body={"all of your enrolled classes will be displayed here"}
            fetch={props.fetchUserData}
            footer={"Try To Get Enrolled Classes"}
          />
        )}
      </div>
    </div>
  );
}
