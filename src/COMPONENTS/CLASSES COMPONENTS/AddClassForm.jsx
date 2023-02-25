import React from "react";
import axios from "axios";

// form components

import SubmitButton from "../../COMPONENTS/FORM COMPONENTS/SubmitButton";
import CancelButton from "../../COMPONENTS/FORM COMPONENTS/CancelButton";

// utils components
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import Loading from "../GLOBAL COMPONENTS/Loading";

// global functions
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { useGlobalContext } from "../../context";
import AddClassCompiledInputFields from "./IN-FILE COMPONENTS/AddClassCompiledInputFields";
import AddClassCompiledButtons from "./IN-FILE COMPONENTS/AddClassCompiledButtons";
import AddClassCompiledFileComps from "./IN-FILE COMPONENTS/AddClassCompiledFileComps";

export default function AddClassForm(props) {
  const [error, setError] = React.useState({ active: false, message: "" });
  const [loading, setLoading] = React.useState(false);
  const [classData, setClassData] = React.useState({
    class_name: "",
    class_subject: "",
    class_section: "",
    class_is_ongoing: false,
    class_image: "",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
  });

  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();

  // add class function
  const handleCreateClass = async (e) => {
    e.preventDefault();
    const { fileName } = selectedFile;
    const { class_name, class_section, class_subject, class_is_ongoing, class_image } = classData;
    let classImage = "";
    setLoading(true);
    if (class_name !== "" && class_name.trim() !== "") {
      try {
        if (class_image) {
          classImage = await file_fns.fileUpload(e.target.class_image.files[0], axios, url, token);
        }
        if (!classImage?.startsWith("Error")) {
          const { data } = await axios.post(
            `${url}/classes`,
            {
              class_name,
              class_section,
              class_subject,
              class_is_ongoing,
              class_image: classImage !== "" ? classImage : null,
              file_name: fileName !== "" ? fileName : null,
            },
            { headers: { Authorization: token } }
          );
          if (data) {
            props.fetchClasses();
          }
          props.setCanAddClass(false);
        } else if (classImage?.startsWith("Error")) {
          setError({ active: true, message: classImage });
        }
      } catch (error) {
        console.log(error);
        setError({ active: true, message: error });
      }
    } else {
      setError({
        active: true,
        message: "Fill in the required fields with appropriate content before creating.",
      });
    }
    setLoading(false);
  };

  // onchange add class function
  const handleClassData = ({ name, value }) => {
    setClassData((prev) => {
      return {
        ...prev,
        [name]: value === "true" ? true : value === "false" ? false : value,
      };
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    // background blur
    <div className="custom-flex absolute top-0 w-full min-h-screen h-auto z-10 backdrop-blur-lg ">
      <DropDownError error={error} setError={setError} />

      {/* form background */}
      <div
        className="custom-flex custom-light-border z-10 p-5 bg-white my-10 rounded-lg shadow-md w-11/12 h-fit
                  tablet:w-8/12
                  laptop-s:w-6/12
                  laptop-l:w-6/12"
      >
        {/* form body */}
        <form
          method="POST"
          className="custom-flex flex-col text-center gap-5 w-full"
          onSubmit={(e) => handleCreateClass(e)}
        >
          <AddClassCompiledInputFields handleClassData={handleClassData} classData={classData} />

          <AddClassCompiledButtons classData={classData} handleClassData={handleClassData} />

          <AddClassCompiledFileComps
            selectedFile={selectedFile}
            setClassData={setClassData}
            handleClassData={handleClassData}
            setSelectedFile={setSelectedFile}
            classData={classData}
          />

          {/* create or cancel */}
          <div
            className="custom-flex gap-5 w-full
                      tablet:justify-end tablet:w-80"
          >
            <SubmitButton value={"CREATE"} />
            <CancelButton onClick={props.handleCanAddClass} />
          </div>
        </form>
      </div>
    </div>
  );
}
