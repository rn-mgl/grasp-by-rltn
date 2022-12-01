import React from "react";
import axios from "axios";

// single task to grade components
import InputField from "../../COMPONENTS/FORM COMPONENTS/InputField";
import Comments from "../../COMPONENTS/COMMENT COMPONENTS/Comments";
import FileViewer from "../../COMPONENTS/POST COMPONENTS/FileViewer";

// util components
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";

// global function components
import { Buffer } from "buffer";
import { useGlobalContext } from "../../context";
import SingleTaskToGradeHeaderMessage from "./IN-FILE COMPONENTS/SingleTaskToGradeHeaderMessage";
import SubmitButton from "../../COMPONENTS/FORM COMPONENTS/SubmitButton";
import CancelButton from "../../COMPONENTS/FORM COMPONENTS/CancelButton";

export default function SingleTaskToGrade(props) {
  const [task, setTask] = React.useState({});
  const [error, setError] = React.useState({ active: false, message: "" });
  const [studentGrade, setStudentGrade] = React.useState({
    student_task_points: undefined,
    student_graded: false,
  });

  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");
  const file = task?.student_file ? Buffer.from(task.student_file).toString() : "";

  // get student task data
  const fetchTask = React.useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${url}/to-grade/${props.class_id}/tasks/${props.task_id}/students/${props.studentSelected}`,
        {
          headers: { Authorization: token },
        }
      );
      if (data) {
        setStudentGrade({
          student_task_points: data.student_task_points,
          student_graded: data.student_task_points !== null,
        });
        setTask(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [props.task_id, token, props.class_id, props.studentSelected, url]);

  // onchange student grade function
  const handleStudentGrade = ({ name, value }) => {
    setStudentGrade((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // grade the student
  const handleGradeTask = async (e) => {
    e.preventDefault();
    if (task?.task_points !== "" && task.task_points !== null && task.task_points !== undefined) {
      try {
        const { data } = await axios.patch(
          `${url}/to-grade/${props.class_id}/tasks/${props.task_id}/students/${props.studentSelected}`,
          {
            points:
              studentGrade.student_task_points > task.task_points
                ? task.task_points
                : studentGrade.student_task_points,
          },
          { headers: { Authorization: token } }
        );

        if (data) {
          fetchTask();
          props.fetchStudentsTasks();
        }
      } catch (error) {
        console.log(error);
        setError({ active: true, message: error.response.data.msg });
      }
    } else {
      setError({
        active: true,
        message: "Fill in the required fields with appropriate content before grading.",
      });
    }
  };

  // remove the grade
  const handleRemoveGradeTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${url}/to-grade/${props.class_id}/tasks/${props.task_id}/students`,
        {
          student_id: props.studentSelected,
        },
        { headers: { Authorization: token } }
      );

      if (data) {
        fetchTask();
        props.fetchStudentsTasks();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  };

  React.useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const gradeFunction = studentGrade.student_graded ? handleRemoveGradeTask : handleGradeTask;

  return (
    <div
      className="custom-flex custom-light-border w-full absolute bg-white left-0 top-0 min-h-screen h-auto z-10 gap-5 flex-col
                laptop-s:static"
    >
      <DropDownError error={error} setError={setError} />

      <SingleTaskToGradeHeaderMessage task={task} />

      <form
        className="custom-flex flex-col gap-5 w-full
                  tablet:w-8/12
                  laptop-s:w-9/12
                  laptop-l:w-10/12"
        action=""
        method="POST"
        onSubmit={(e) => gradeFunction(e)}
      >
        <InputField
          placeholder={"Student Score"}
          type={"number"}
          name={"student_task_points"}
          required={true}
          disabled={studentGrade.student_graded}
          value={studentGrade.student_task_points}
          onChange={handleStudentGrade}
        />

        <div
          className="custom-flex w-full gap-5 flex-col
                    tablet:flex-row"
        >
          <CancelButton
            onClick={() => {
              props.handleStudentSelected(-1);
              props.fetchStudentsTasks();
            }}
          />
          <SubmitButton value={studentGrade.student_graded ? "REMOVE GRADE" : "GRADE STUDENT"} />
        </div>
      </form>

      {task.student_file ? (
        <FileViewer file={file} post={task} />
      ) : (
        <div className="font-Poppins font-normal text-base">no file attached.</div>
      )}

      <Comments
        name="private_comment_text"
        type="private_comment"
        post_id={parseInt(props.task_id)}
        fetchPage={fetchTask}
        post={task}
        class_id={task?.class_id}
      />
    </div>
  );
}
