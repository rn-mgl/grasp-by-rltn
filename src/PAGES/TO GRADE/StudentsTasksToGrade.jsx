import React from "react";
import axios from "axios";

// students tasks to grade
import SingleTaskToGrade from "./SingleTaskToGrade";
import StudentsToGradePreviewBar from "../../COMPONENTS/TOGRADE COMPONENTS/StudentsToGradePreviewBar";
import ToGradeNavbar from "../../COMPONENTS/TOGRADE COMPONENTS/ToGradeNavbar";

// utils components
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";

// global function components
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";

export default function TaskToGrade() {
  const [students, setStudents] = React.useState([]);
  const [classHandler, setClassHandler] = React.useState(-1);
  const [studentSelected, setStudentSelected] = React.useState(-1);
  const [error, setError] = React.useState({ active: false, message: "" });

  const { class_id, task_id } = useParams();
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  // get students
  const fetchStudentsTasks = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/to-grade/${class_id}/tasks/${task_id}/students`, {
        headers: { Authorization: token },
      });

      if (data) {
        setStudents(data.students);
        setClassHandler(data.handler.class_handler);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [class_id, task_id, token, url]);

  // toggle select student to grade
  const handleStudentSelected = (id) => {
    setStudentSelected((prev) => (prev !== id ? id : -1));
  };

  React.useEffect(() => {
    fetchStudentsTasks();
  }, [fetchStudentsTasks]);

  return (
    <div>
      <DropDownError error={error} setError={setError} />
      <ToGradeNavbar class_id={class_id} task_id={task_id} />
      <div
        className="custom-flex flex-col items-center w-full mx-auto gap-3 mt-28
                tablet:w-10/12 tablet:mt-32
                laptop-s:w-11/12 laptop-s:mt-16  laptop-s:flex-row laptop-s:items-start"
      >
        <div
          className="w-full custom-flex flex-col gap-5
                  laptop-s:w-4/12"
        >
          {students?.length > 0 ? (
            students.map((student) => {
              return (
                student.user_id !== classHandler && (
                  <StudentsToGradePreviewBar
                    handleStudentSelected={handleStudentSelected}
                    student={student}
                    studentSelected={studentSelected}
                    key={student.student_id}
                  />
                )
              );
            })
          ) : (
            <MessagePage
              header={"No Student Submitted Tasks"}
              body={"your student's submitted tasks will be displayed here"}
              fetch={fetchStudentsTasks}
              footer={"Try To Get Submissions"}
            />
          )}
        </div>

        <div
          className="w-full 
                  laptop-s:w-8/12"
        >
          {studentSelected !== -1 && (
            <SingleTaskToGrade
              class_id={class_id}
              task_id={task_id}
              handleStudentSelected={handleStudentSelected}
              fetchStudentsTasks={fetchStudentsTasks}
              studentSelected={studentSelected}
              classHandler={classHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}
