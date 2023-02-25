import React from "react";
import axios from "axios";

// missing components
import TasksPreviewBar from "../../COMPONENTS/SINGLE TASK COMPONENTS/TasksPreviewBar";

// util components
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";

// global function components
import { useGlobalContext } from "../../context";

export default function Missing() {
  const [missingTask, setMissingTask] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const class_id = window.location.pathname.split("/")[2];
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  const fetchClassTask = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/tasks/missing`, {
        headers: { Authorization: token },
      });
      if (data) {
        setMissingTask(data.missing_data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  }, [token, url]);

  React.useEffect(() => {
    fetchClassTask();
  }, [fetchClassTask]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className="flex flex-col items-center mt-10 w-full mx-auto gap-6
                tablet:w-10/12
                laptop-s:w-8/12"
    >
      <DropDownError error={error} setError={setError} />
      {missingTask?.length > 0 ? (
        <TasksPreviewBar class_id={class_id} task={missingTask} />
      ) : (
        <MessagePage
          header={"No Missing Tasks"}
          body={"your missing tasks will be displayed here"}
          fetch={fetchClassTask}
          footer={"Try To Get Tasks"}
        />
      )}
    </div>
  );
}
