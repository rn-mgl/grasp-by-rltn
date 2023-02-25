import React from "react";
import axios from "axios";
import SingleClassNavbar from "../../COMPONENTS/SINGLE CLASS COMPONENTS/SingleClassNavbar";
import TasksPreviewBar from "../../COMPONENTS/SINGLE TASK COMPONENTS/TasksPreviewBar";
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiArchiveIn } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { BiArrowBack } from "react-icons/bi";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";

export default function ClassTasks() {
  const [tasks, setTasks] = React.useState([]);
  const [classHandler, setClassHandler] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const class_id = window.location.pathname.split("/")[2];
  const user = parseInt(localStorage.getItem("curr"));
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  const fetchClassTask = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/tasks`, {
        headers: { Authorization: token },
      });

      if (data) {
        setTasks(data.task);
        setClassHandler(data.handler);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  }, [class_id, token, url]);

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

      <SingleClassNavbar class_id={class_id} />

      {classHandler === user && (
        <div className="flex gap-5 w-full">
          <NavLink
            to={`/class/${class_id}/tasks/create`}
            className="custom-btn custom-flex gap-2 p-2 py-0 border-2 border-pr-blk bg-pr-blk w-36 text-sm text-pr-wht hover:shadow-md"
          >
            <IoIosAddCircleOutline
              size="1.3rem"
              className="laptop-s:scale-105
                laptop-l:scale-125"
            />

            <div className="font-Poppins ">Add Task</div>
          </NavLink>

          <NavLink
            to={`/class/${class_id}/archived-tasks`}
            className="custom-btn custom-flex gap-2 p-3 border-pr-blk w-48 text-sm text-pr-blk hover:underline"
          >
            <BiArchiveIn
              size="1.3rem"
              className="laptop-s:scale-105
                laptop-l:scale-125"
            />

            <div className="font-Poppins ">Archived Tasks</div>
          </NavLink>
        </div>
      )}

      <NavLink
        className="capitalize ml-5 flex items-center gap-2 font-Poppins underline underline-offset-4 mr-auto font-light
                  tablet:ml-5
                  laptop-s:hidden"
        to={`/class/${class_id}`}
      >
        <BiArrowBack /> Back
      </NavLink>
      {tasks?.length > 0 ? (
        <TasksPreviewBar task={tasks} classHandler={classHandler} />
      ) : (
        <MessagePage
          header={"No Class Tasks"}
          body={"your class tasks will be displayed here"}
          fetch={fetchClassTask}
          footer={"Try To Get Class Tasks"}
        />
      )}
    </div>
  );
}
