import React from "react";
import axios from "axios";

// single task components
import TaskHeader from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskHeader";
import TaskBody from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskBody";
import TaskSubmitPanel from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskSubmitPanel";
import Comments from "../../COMPONENTS/COMMENT COMPONENTS/Comments";
import TaskHeaderInfo from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskHeaderInfo";
import ToGradeNavbar from "../../COMPONENTS/TOGRADE COMPONENTS/ToGradeNavbar";

// global function components
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { Buffer } from "buffer";

// utils components
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import NavBack from "./IN-FILE COMPONENTS/NavBack";
import { AiOutlineMore } from "react-icons/ai";

export default function SingleTask() {
  const [task, setTask] = React.useState({});
  const [canEditTask, setCanEditTask] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const { task_id } = useParams();
  const class_id = window.location.pathname.split("/")[2];
  const user = parseInt(localStorage.getItem("curr"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { url } = useGlobalContext();
  const file = task?.task_file ? Buffer.from(task?.task_file).toString() : undefined;

  // get task data
  const fetchTask = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/tasks/${task_id}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setTask(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  }, [task_id, token, class_id, url]);

  // archive task
  const archiveTask = async () => {
    try {
      const data = await axios.patch(
        `${url}/classes/${class_id}/tasks`,
        { task_id },
        { headers: { Authorization: token } }
      );
      if (data) {
        navigate(`/class/${class_id}/archived-tasks`);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  };

  // toggle can edit task form or not
  const handleCanEditTask = () => {
    setCanEditTask((prev) => !prev);
  };

  React.useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    <div
      className={`${
        user === task?.class_handler ? "my-14 mt-28 laptop-s:mt-14" : "my-14"
      } w-11/12 mx-auto 
                laptop-l:w-10/12`}
    >
      <DropDownError error={error} setError={setError} />

      {task?.class_handler === user && (
        <ToGradeNavbar class_id={task?.class_id} task_id={task?.task_id} />
      )}

      <div className="w-full flex items-center mt-5">
        <NavBack class_id={class_id} task={task} />

        {task?.assigned_by === user && task?.class_handler === user && (
          <div>
            <AiOutlineMore className="cursor-pointer" onClick={handleCanEditTask} />
            {canEditTask && (
              <TaskHeaderInfo
                class_id={class_id}
                isArchived={task?.is_archived}
                archiveTask={archiveTask}
                task_id={task_id}
              />
            )}
          </div>
        )}
      </div>

      <div
        className="mt-10 flex gap-10 flex-col  w-full
                  laptop-s:flex-row laptop-s:gap-5"
      >
        <div
          className={`custom-light-border h-fit flex flex-col gap-5
                  ${user !== task?.class_handler ? "laptop-s:w-8/12 laptop-l:w-9/12" : "w-full"} 
                   ${loading && "opacity-70"}`}
        >
          <TaskHeader
            assigned_by={`${task?.assigned_by_name} ${task?.assigned_by_surname}`}
            topic={task?.task_main_topic}
            submission_date={task?.task_submission_date}
            task_points={task?.task_points}
            student_points={task?.student_task_points}
          />

          <div className="custom-divider" />

          <TaskBody task_info={task?.task_text} task={task} file={file} />

          <Comments
            name="public_comment_text"
            post_id={parseInt(task_id)}
            fetchPage={fetchTask}
            type={"public_comment"}
            post={task}
            class_id={class_id}
          />
        </div>

        {user !== task?.class_handler && (
          <div
            className="flex flex-col h-fit gap-5 custom-light-border
                    laptop-s:w-4/12
                    laptop-l:w-3/12"
          >
            <TaskSubmitPanel fetchTask={fetchTask} task={task} task_id={task_id} />

            <Comments
              name="private_comment_text"
              post_id={parseInt(task_id)}
              fetchPage={fetchTask}
              type="private_comment"
              post={task}
              class_id={class_id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
