import React from "react";
import axios from "axios";

// form components
import CancelButton from "../FORM COMPONENTS/CancelButton";
import InputField from "../FORM COMPONENTS/InputField";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";

// utils and error components
import Loading from "../GLOBAL COMPONENTS/Loading";
import DropDownError from "../ERROR COMPONENTS/DropDownError";

// global functions components
import { useGlobalContext } from "../../context";

export default function JoinClassForm(props) {
  const [classCode, setClassCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const token = localStorage.getItem("token");
  const user = parseInt(localStorage.getItem("curr"));
  const { url } = useGlobalContext();

  // join class function
  const handleJoinClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${url}/users/${user}`,
        { class_code: classCode },
        { headers: { Authorization: token } }
      );
      if (data.joined_status.affectedRows > 0) {
        props.fetchClasses();
      }
      props.setCanJoinClass(false);
      setClassCode("");
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error?.response?.data?.msg });
    }
    setLoading(false);
  };

  // join class onchange input code function
  const handleClassCode = ({ value }) => {
    setClassCode(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="custom-flex fixed top-0 w-full h-screen z-10 backdrop-blur-lg ">
      <DropDownError error={error} setError={setError} />
      {/* form background */}
      <div
        className="custom-flex custom-light-border z-10 p-5 bg-white mb-10 rounded-lg shadow-md w-11/12 h-fit
              tablet:w-8/12
              laptop-s:w-6/12
              laptop-l:w-6/12"
      >
        {/* form body */}
        <form
          method="POST"
          className="custom-flex flex-col text-center gap-5 w-full"
          onSubmit={(e) => handleJoinClass(e)}
        >
          <div className="custom-flex flex-col gap-2 w-full">
            <InputField
              placeholder={"CLASS CODE"}
              type={"text"}
              name={"class_code"}
              value={classCode}
              onChange={handleClassCode}
            />
          </div>
          {/* create or cancel */}
          <div
            className="custom-flex gap-5 w-full
                      tablet:justify-end tablet:w-80"
          >
            <SubmitButton value="JOIN" />
            <CancelButton onClick={props.handleCanJoinClass} />
          </div>
        </form>
      </div>
    </div>
  );
}
