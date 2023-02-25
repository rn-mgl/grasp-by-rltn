import React from "react";
import axios from "axios";

// archived tasks components
import SingleClassNavbar from "../../COMPONENTS/SINGLE CLASS COMPONENTS/SingleClassNavbar";
import ArchivedTasksPreviewBar from "../../COMPONENTS/SINGLE TASK COMPONENTS/ArchivedTasksPreviewBar";
import NavBack from "../PEOPLE PAGES/IN-FILE COMPONENTS/NavBack";

// utils components
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";

// global function components
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";

export default function ArchivedTasks() {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState({ active: false, message: "" });

  const { class_id } = useParams();
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  // get archived tasks
  const fetchArchivedTasks = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/archived-tasks`, {
        headers: { Authorization: token },
      });

      if (data) {
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [class_id, token, url]);

  React.useEffect(() => {
    fetchArchivedTasks();
  }, [fetchArchivedTasks]);

  return (
    <div
      className="flex flex-col items-center mt-10 w-full mx-auto gap-6
                tablet:w-10/12
                laptop-s:w-8/12"
    >
      <DropDownError error={error} setError={setError} />

      <SingleClassNavbar class_id={class_id} />

      <NavBack class_id={class_id} />

      {tasks?.length > 0 ? (
        <ArchivedTasksPreviewBar task={tasks} />
      ) : (
        <MessagePage
          header={"No Archived Tasks"}
          body={"your archived tasks will be displayed here"}
          fetch={fetchArchivedTasks}
          footer={"Try To Get Archived Tasks"}
        />
      )}
    </div>
  );
}
