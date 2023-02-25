import React from "react";
import axios from "axios";

// archived single task components
import NavBack from "./IN-FILE COMPONENTS/NavBack";
import Comments from "../../COMPONENTS/COMMENT COMPONENTS/Comments";
import TaskHeaderInfo from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskHeaderInfo";
import TaskHeader from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskHeader";
import TaskBody from "../../COMPONENTS/SINGLE TASK COMPONENTS/TaskBody";

// utils components
import { AiOutlineMore } from "react-icons/ai";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";

// global function components
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { Buffer } from "buffer";

export default function ArchivedSingleTask() {
  const [task, setTask] = React.useState({});

  const [canEditTask, setCanEditTask] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const token = localStorage.getItem("token");
  const user = parseInt(localStorage.getItem("curr"));

  const navigate = useNavigate();
  const { url } = useGlobalContext();
  const { task_id } = useParams();
  const class_id = window.location.pathname.split("/")[2];
  const baseUrl = `${url}/classes/${class_id}`;

  const file = task?.task_file && Buffer.from(task?.task_file).toString();

  // get archived task
  const fetchTask = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/archived-tasks/${task_id}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setTask(data.task_data[0]);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [task_id, token, baseUrl]);

  // assign archived task
  const openTask = async () => {
    try {
      const data = await axios.patch(
        `${baseUrl}/archived-tasks`,
        { task_id },
        { headers: { Authorization: token } }
      );

      if (data) {
        navigate(`/class/${class_id}/tasks`);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  };

  // delete archived task
  const handleDeleteTask = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${baseUrl}/tasks/${task_id}`, {
        headers: { Authorization: token },
      });
      const { file_name } = data;
      if (file_name) {
        const resource_type =
          file_name.endsWith(".jpg") || file_name.endsWith(".png")
            ? "image"
            : file_name.endsWith(".mp4") || file_name.endsWith(".mov")
            ? "video"
            : "raw";
        try {
          await axios.delete(`${url}/grasp-by-rltn/file-upload`, {
            headers: { Authorization: token },
            data: { public_id: file_name, resource_type },
          });
        } catch (error) {
          setError({ active: true, message: error });
        }
      }
      if (data) {
        navigate(`/class/${class_id}/tasks`);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  };

  // toggle edit task form
  const handleCanEditTask = () => {
    setCanEditTask((prev) => !prev);
  };

  React.useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    <div
      className="w-11/12 mx-auto my-14
                laptop-l:w-10/12"
    >
      <DropDownError error={error} setError={setError} />

      <div className="w-full flex items-center mt-5">
        <NavBack class_id={class_id} task={task} />
        {task?.assigned_by === user && task?.class_handler === user && (
          <div>
            <AiOutlineMore className="cursor-pointer" onClick={handleCanEditTask} />
            {canEditTask && (
              <TaskHeaderInfo
                class_id={class_id}
                isArchived={task?.is_archived}
                openTask={openTask}
                handleDeleteTask={handleDeleteTask}
                task_id={task_id}
              />
            )}
          </div>
        )}
      </div>

      <div
        className="flex gap-10 flex-col mt-10 w-full
                  laptop-s:flex-row laptop-s:gap-5 "
      >
        <div className={`custom-light-border h-fit flex flex-col gap-5 ${loading && "opacity-70"}`}>
          <TaskHeader
            assigned_by={`${task?.assigned_by_name} ${task?.assigned_by_surname}`}
            topic={task?.task_main_topic}
            submission_date={task?.task_submission_date}
            task_points={task?.task_points}
            student_points={task?.student_task_points}
          />

          <div className="custom-divider" />

          <TaskBody task_info={task?.task_text} file={file} />

          <Comments
            name="public_comment_text"
            fetchPage={fetchTask}
            type="public_comment"
            post={task}
            post_id={parseInt(task_id)}
            class_id={class_id}
          />
        </div>
      </div>
    </div>
  );
}
