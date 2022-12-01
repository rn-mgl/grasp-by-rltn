import React from "react";
import axios from "axios";

// submit panel components
import AttachmentInput from "../../COMPONENTS/FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../../COMPONENTS/FORM COMPONENTS/AttachmentPreview";
import FileViewer from "../POST COMPONENTS/FileViewer";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";
import CancelButton from "../FORM COMPONENTS/CancelButton";

// global function components
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { useGlobalContext } from "../../context";
import { Buffer } from "buffer";

// util components
import DropDownError from "../ERROR COMPONENTS/DropDownError";

export default function TaskSubmitPanel(props) {
  const [submissionData, setSubmissionData] = React.useState("");
  const [error, setError] = React.useState({ active: false, message: "" });
  const [loading, setLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });

  const class_id = window.location.pathname.split("/")[2];
  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();

  const file = props.task?.student_file
    ? Buffer.from(props.task.student_file).toString()
    : undefined;

  const handleSubmissionData = ({ value }) => {
    setSubmissionData(value);
  };

  // submit task function
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    let student_file = null;
    const { fileName } = selectedFile;
    setLoading(true);
    try {
      if (submissionData) {
        student_file = await file_fns.fileUpload(
          e.target.file_submission.files[0],
          axios,
          url,
          token
        );
      }
      if (!student_file?.startsWith("Error")) {
        const { data } = await axios.patch(
          `${url}/classes/${class_id}/students-submit/${props.task_id}`,
          { student_file, file_name: fileName !== "" ? fileName : null },
          { headers: { Authorization: token } }
        );
        console.log(data);
        if (data) {
          props.fetchTask();
        }
      } else if (student_file?.startsWith("Error")) {
        setError({ active: true, message: student_file });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
    setLoading(false);
  };

  // unsubmit task function
  const handleUnsubmitTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${url}/classes/${class_id}/students-unsubmit/${props.task_id}`,
        { holder: props.task_id }, // holder data, no purpose
        { headers: { Authorization: token } }
      );
      if (data) {
        props.fetchTask();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
    setLoading(false);
  };

  const submitFunction = props.task.student_submitted ? handleUnsubmitTask : handleSubmitTask;

  return (
    <div className={` ${loading && "opacity-70"} custom-flex flex-col gap-5`}>
      <DropDownError error={error} setError={setError} />

      {props.task.student_file ? (
        <div className={`custom-flex w-full`}>
          <FileViewer file={file} post={props.task} />
        </div>
      ) : (
        <AttachmentPreview selectedFile={selectedFile} file={file} />
      )}

      <form className={` flex flex-col gap-2 w-full `} onSubmit={(e) => submitFunction(e)}>
        <AttachmentInput
          name={"file_submission"}
          id={"file_submission"}
          onChange1={handleSubmissionData}
          onChange2={(e) => file_fns.handleFileSelection(e, setSelectedFile)}
          primaryLabel={"ADD FILE"}
          secondaryLabel={"CHANGE FILE"}
          selectedFile={selectedFile}
          value={submissionData}
          hasSubmitted={props.task?.student_submitted}
        />

        {props.task?.class_is_ongoing === 1 && (
          <>
            {!props.task?.student_submitted && selectedFile?.fileUrl && (
              <CancelButton
                onClick={() => {
                  file_fns.handleRemoveFile(setSelectedFile);
                  setSubmissionData("");
                }}
                label={"REMOVE FILE"}
              />
            )}

            <SubmitButton value={`${props.task?.student_submitted ? "UNSUBMIT" : "SUBMIT"}`} />
          </>
        )}
      </form>
    </div>
  );
}
