import React from "react";
import axios from "axios";

// profile components
import EditProfile from "../../COMPONENTS/PROFILE COMPONENTS/EditProfile";
import ProfileHeader from "../../COMPONENTS/PROFILE COMPONENTS/ProfileHeader";
import ProfileCompiledClasses from "./IN-FILE COMPONENTS/ProfileCompiledClasses";
import ProfileCompileTasks from "./IN-FILE COMPONENTS/ProfileCompileTasks";
import ProfileCompiledCountCard from "./IN-FILE COMPONENTS/ProfileCompiledCountCard";

// global function component
import { useGlobalContext } from "../../context";

// util component
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";

export default function Profile() {
  const [userData, setUserData] = React.useState({});
  const [classesData, setClassesData] = React.useState([]);
  const [tasksData, setTaskData] = React.useState([]);
  const [countsData, setCountData] = React.useState({});
  const [canEditProfile, setCanEditProfile] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const { url } = useGlobalContext();
  const user = parseInt(localStorage.getItem("curr"));
  const token = localStorage.getItem("token");

  // get user data
  const fetchUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/users/${user}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, url, user]);

  // get user classes
  const fetchUserClasses = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/users/${user}/user-classes`, {
        headers: { Authorization: token },
      });
      if (data) {
        setClassesData(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, url, user]);

  // get user classes
  const fetchUserTasks = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/users/${user}/user-tasks`, {
        headers: { Authorization: token },
      });
      if (data) {
        setTaskData(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, url, user]);

  // get user classes
  const fetchUserTaskCount = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/users/${user}/task-count`, {
        headers: { Authorization: token },
      });
      if (data) {
        setCountData(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, url, user]);

  // toggle can edit profile or not
  const handleCanEditProfile = () => {
    setCanEditProfile((prev) => !prev);
  };

  React.useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  React.useEffect(() => {
    fetchUserClasses();
  }, [fetchUserClasses]);

  React.useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  React.useEffect(() => {
    fetchUserTaskCount();
  }, [fetchUserTaskCount]);

  return (
    <div className="custom-flex flex-col  bg-gradient-to-b from-white to-pr-gry">
      <div className="custom-flex flex-col tablet:w-10/12 laptop-s:w-7/12 laptop-l:w-8/12 gap-10">
        <DropDownError error={error} setError={setError} />

        {canEditProfile && (
          <EditProfile
            fetchUserData={fetchUserData}
            userData={userData}
            handleCanEditProfile={handleCanEditProfile}
          />
        )}

        <ProfileHeader handleCanEditProfile={handleCanEditProfile} userData={userData} />

        <ProfileCompiledCountCard classesData={classesData} countsData={countsData} />

        <ProfileCompiledClasses classesData={classesData} fetchUserData={fetchUserData} />

        <ProfileCompileTasks tasksData={tasksData} fetchUserData={fetchUserData} />
      </div>
    </div>
  );
}
