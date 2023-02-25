import React from "react";
import axios from "axios";

// add task components
import InputField from "../FORM COMPONENTS/InputField";
import TextArea from "../FORM COMPONENTS/TextArea";
import RadioButton from "../FORM COMPONENTS/RadioButton";
import AttachmentInput from "../FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../FORM COMPONENTS/AttachmentPreview";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";

// utils components
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import CancelButton from "../FORM COMPONENTS/CancelButton";
import MessagePop from "../../PAGES/CLASS PAGES/IN-FILE COMPONENTS/MessagePop";

// global function components
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context";

export default function AddTaskForm() {
  const [error, setError] = React.useState({ active: false, message: "" });
  const [loading, setLoading] = React.useState(false);
  const [created, setCreated] = React.useState(false);
  const [messagePop, setMessagePop] = React.useState({
    active: false,
    message: "Task Created Successfully",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });
  const [taskData, setTaskData] = React.useState({
    task_main_topic: "",
    task_text: "",
    task_submission_date: "",
    task_points: 100,
    task_open: false,
    task_file: undefined,
  });

  const class_id = window.location.pathname.split("/")[2];
  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();

  // create task function
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const { fileName } = selectedFile;
    const { task_main_topic, task_text, task_submission_date, task_points, task_open, task_file } =
      taskData;
    let taskFile = "";
    setLoading(true);
    try {
      if (task_file) {
        taskFile = await file_fns.fileUpload(e.target.task_file.files[0], axios, url, token);
      }

      if (!taskFile?.startsWith("Error")) {
        const { data } = await axios.post(
          `${url}/classes/${class_id}/tasks`,
          {
            task_main_topic,
            task_text,
            task_submission_date,
            task_points,
            task_open,
            task_file: taskFile,
            file_name: fileName !== "" && fileName,
          },
          { headers: { Authorization: token } }
        );
        if (data) {
          setCreated(true);
          setMessagePop((prev) => {
            return {
              ...prev,
              active: true,
            };
          });
        }
        setTaskData({
          task_main_topic: "",
          task_text: "",
          task_submission_date: "",
          task_points: 100,
          task_open: false,
          task_file: undefined,
        });
        setSelectedFile({ fileName: "", fileUrl: undefined, isImage: false });
      } else if (taskFile?.startsWith("Error")) {
        setError({ active: true, message: taskFile });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  };

  // onchange task data function
  const handleTaskData = ({ name, value }) => {
    setTaskData((prev) => {
      return {
        ...prev,
        [name]: value === "true" ? true : value === "false" ? false : value,
      };
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (created) {
    setTimeout(() => {
      setCreated(false);
    }, 5000);
  }

  return (
    <div className="custom-flex w-full my-10 bg-white">
      <DropDownError error={error} setError={setError} />

      <form
        className="custom-flex w-11/12 flex-col gap-5
                  laptop-s:flex-row laptop-s:items-start"
        method="POST"
        onSubmit={(e) => handleCreateTask(e)}
      >
        <MessagePop messagePop={messagePop} setMessagePop={setMessagePop} />

        <div
          className="bg-pr-wht w-full p-5 rounded-lg custom-flex flex-col gap-5
                    laptop-s:w-8/12
                    laptop-l:w-9/12"
        >
          <InputField
            onChange={handleTaskData}
            name={"task_main_topic"}
            type={"text"}
            value={taskData.task_main_topic}
            placeholder={"Main Topic"}
            required={true}
          />

          <TextArea
            onChange={handleTaskData}
            placeholder={"Topic Information"}
            name={"task_text"}
            value={taskData.task_text}
          />
        </div>

        <div
          className="w-full custom-flex flex-col gap-5
                      laptop-s:w-4/12
                      laptop-l:w-3/12"
        >
          <div className="bg-pr-wht w-full p-5 rounded-lg custom-flex flex-col gap-5">
            <div className="custom-flex flex-col w-full gap-2">
              <div className="font-Poppins font-semibold mobile-l:text-lg">TASK POINTS</div>
              <InputField
                onChange={handleTaskData}
                placeholder={"Total Task Points"}
                name={"task_points"}
                type={"number"}
                value={taskData.task_points}
              />
            </div>

            <div className="custom-flex flex-col w-full gap-2">
              <div className="font-Poppins font-semibold mobile-l:text-lg">SUBMISSION DATE</div>
              <InputField
                onChange={handleTaskData}
                placeholder={"Submission Date"}
                type={"datetime-local"}
                name={"task_submission_date"}
                value={taskData.task_submission_date}
              />
            </div>
          </div>

          <div className="bg-pr-wht w-full p-5 rounded-lg custom-flex flex-col gap-5">
            <div className="font-Poppins font-semibold mobile-l:text-lg">ATTACH FILE</div>
            {selectedFile.fileUrl && <AttachmentPreview selectedFile={selectedFile} />}

            {selectedFile.fileUrl && (
              <CancelButton
                onClick={() => {
                  file_fns.handleRemoveFile(setSelectedFile);
                  setTaskData((prev) => {
                    return {
                      ...prev,
                      task_file: undefined,
                    };
                  });
                }}
                label={"REMOVE FILE"}
              />
            )}

            <AttachmentInput
              htmlFor={"task_file"}
              name={"task_file"}
              id={"task_file"}
              onChange1={handleTaskData}
              onChange2={(e) => file_fns.handleFileSelection(e, setSelectedFile)}
              value={taskData.task_file}
              selectedFile={selectedFile}
              primaryLabel={"ATTACH TASK FILE"}
              secondaryLabel={"CHANGE TASK FILE"}
            />
          </div>

          <div className="bg-pr-wht w-full rounded-lg custom-flex flex-col gap-5">
            <div className="custom-flex p-5 flex-col gap-2">
              <div className="font-Poppins font-semibold mobile-l:text-lg">AFTER CREATION?</div>
              <div className="flex gap-5 w-11/12">
                <RadioButton
                  onChange={handleTaskData}
                  name={"task_open"}
                  value={true}
                  id={"task_is_open"}
                  checked={taskData.task_open}
                  buttonLabel={"ASSIGN"}
                />
                <RadioButton
                  onChange={handleTaskData}
                  name={"task_open"}
                  value={false}
                  id={"task_not_open"}
                  checked={!taskData.task_open}
                  buttonLabel={"DRAFT"}
                />
              </div>
            </div>
          </div>
          <div className="custom-flex gap-5 flex-row">
            <SubmitButton value="CREATE" />
            <NavLink
              to={`/class/${class_id}/tasks`}
              className="custom-btn custom-flex bg-pr-gry w-28 text-base"
            >
              BACK
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
