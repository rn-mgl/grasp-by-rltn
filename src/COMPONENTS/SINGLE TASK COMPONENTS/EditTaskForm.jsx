import axios from "axios";
import React from "react";

// edit task components
import InputField from "../FORM COMPONENTS/InputField";
import TextArea from "../FORM COMPONENTS/TextArea";
import AttachmentInput from "../FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../FORM COMPONENTS/AttachmentPreview";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";
import CancelButton from "../FORM COMPONENTS/CancelButton";

// global function components
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { useGlobalContext } from "../../context";
import { NavLink, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

// util components
import DropDownError from "../ERROR COMPONENTS/DropDownError";

export default function EditTaskForm() {
  const [error, setError] = React.useState({ active: false, message: "" });
  const [taskData, setTaskData] = React.useState({
    task_main_topic: "",
    task_text: "",
    task_submission_date: "",
    task_points: 0,
    task_open: false,
    task_file: "",
    file_name: "",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });

  const navigate = useNavigate();
  const path = window.location.pathname.split("/");
  const class_id = path[2];
  const task_id = path[4];
  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();

  // get task data
  const fetchTask = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/assigner-task/${class_id}/tasks/${task_id}`, {
        headers: { Authorization: token },
      });
      if (data) {
        const task = data.task_data[0];
        setTaskData({
          task_main_topic: task.task_main_topic,
          task_text: task.task_text,
          task_submission_date: task.task_submission_date,
          task_points: parseInt(task.task_points),
          task_open: task.task_open,
          task_file: task.task_file ? Buffer.from(task.task_file).toString() : null,
          file_name: task.file_name ? task.file_name : null,
        });
        setSelectedFile((prev) => {
          return {
            ...prev,
            fileName: task.file_name ? task.file_name : "",
            fileUrl: task.task_file ? Buffer.from(task.task_file).toString() : undefined,
          };
        });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [url, class_id, task_id, token]);

  // edit task
  const handleEditTask = async (e) => {
    e.preventDefault();
    const { task_main_topic, task_text, task_submission_date, task_points, task_file } = taskData;
    const { fileName } = selectedFile;
    let taskFile = "";

    try {
      if (task_file && !task_file.startsWith("https")) {
        taskFile = await file_fns.fileUpload(e.target.taskFile.files[0], axios, url, token);
      }
      if (!taskFile?.startsWith("Error")) {
        const { data } = await axios.patch(
          `${url}/classes/${class_id}/tasks/${task_id}`,
          {
            task_main_topic,
            task_text,
            task_submission_date,
            task_points,
            task_file:
              taskFile !== ""
                ? taskFile
                : task_file && task_file.startsWith("https")
                ? task_file
                : undefined,
            file_name: fileName ? fileName : taskData.file_name ? taskData.file_name : undefined,
          },
          { headers: { Authorization: token } }
        );
        if (data) {
          navigate(
            `/class/${class_id}/${taskData.task_open ? "tasks" : "archived-tasks"}/${task_id}`
          );
        }
      } else if (taskFile?.startsWith("Error")) {
        setError({ active: true, message: taskFile });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // onchange task data function
  const handleTaskData = ({ name, value }) => {
    setTaskData((prev) => {
      return {
        ...prev,
        [name]: name === "task_points" ? parseInt(value) : value,
      };
    });
  };

  React.useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    <div className="custom-flex flex-col p-5 absolute top-0 w-full min-h-screen left-0 z-10 backdrop-blur-lg ">
      <DropDownError error={error} setError={setError} />

      <div
        className="custom-flex custom-light-border z-10 p-5 bg-white my-10 rounded-lg shadow-md w-11/12 h-fit
              tablet:w-8/12
              laptop-s:w-6/12
              laptop-l:w-6/12"
      >
        <form
          method="POST"
          className="custom-flex flex-col text-center gap-5 w-full"
          onSubmit={(e) => handleEditTask(e)}
        >
          <div className="custom-flex flex-col gap-2 w-full">
            <div className="font-Poppins font-semibold">TASK MAIN TOPIC</div>
            <InputField
              placeholder={"TASK MAIN TOPIC"}
              type={"text"}
              name={"task_main_topic"}
              value={taskData.task_main_topic}
              required={true}
              onChange={handleTaskData}
            />
          </div>

          <div className="custom-flex flex-col gap-2 w-full">
            <div className="font-Poppins font-semibold">TASK MAIN TOPIC</div>
            <TextArea
              onChange={handleTaskData}
              placeholder={"Task Content"}
              name={"task_text"}
              value={taskData.task_text}
            />
          </div>

          <div className="custom-flex flex-col gap-2 w-full">
            <div className="font-Poppins font-semibold">TASK SUBMISSION DATE</div>
            <InputField
              placeholder={"TASK SUBMISSION DATE"}
              type={"datetime-local"}
              name={"task_submission_date"}
              value={taskData.task_submission_date}
              onChange={handleTaskData}
            />
          </div>

          <div className="custom-flex flex-col gap-2 w-full">
            <div className="font-Poppins font-semibold">TASK POINTS</div>
            <InputField
              placeholder={"TASK POINTS"}
              type={"number"}
              name={"task_points"}
              value={parseInt(taskData.task_points)}
              onChange={handleTaskData}
            />
          </div>

          {selectedFile.fileUrl && (
            <CancelButton
              onClick={() => {
                file_fns.handleRemoveFile(setSelectedFile);
                setTaskData((prev) => {
                  return {
                    ...prev,
                    file_name: "",
                    task_file: "",
                  };
                });
              }}
              label={"REMOVE FILE"}
            />
          )}

          <AttachmentInput
            htmlFor={"taskFile"}
            name={"task_file"}
            id={"taskFile"}
            selectedFile={selectedFile}
            onChange1={handleTaskData}
            onChange2={(e) => file_fns.handleFileSelection(e, setSelectedFile)}
            primaryLabel={taskData.task_file ? "CHANGE FILE" : "UPLOAD FILE"}
            secondaryLabel={!taskData.task_file ? "UPLOAD FILE" : "CHANGE FILE"}
          />

          <AttachmentPreview
            className={"custom-flex flex-col custom-light-border py-3 px-0 laptop-s:w-8/12"}
            postData={taskData}
            selectedFile={selectedFile}
          />

          <div
            className="custom-flex gap-5 w-full
                  tablet:justify-end tablet:w-80"
          >
            <SubmitButton value="EDIT" />
            <NavLink
              to={`/class/${class_id}/${
                taskData.task_open ? "tasks" : "archived-tasks"
              }/${task_id}`}
              className="custom-btn custom-flex bg-pr-gry w-full text-sm
                    laptop-s:text-lg"
            >
              CANCEL
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
