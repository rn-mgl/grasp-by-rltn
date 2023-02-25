import React from "react";
import axios from "axios";
import { Buffer } from "buffer";

// form components
import SubmitButton from "../FORM COMPONENTS/SubmitButton";
import CancelButton from "../FORM COMPONENTS/CancelButton";

// global/functions components
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { useGlobalContext } from "../../context";

// utils components
import Loading from "../GLOBAL COMPONENTS/Loading";
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import EditClassCompiledInputFields from "./IN-FILE COMPONENTS/EditClassCompiledInputFields";
import EditClassCompiledFileComps from "./IN-FILE COMPONENTS/EditClassCompiledFileComps";

export default function EditClassForm(props) {
  const [error, setError] = React.useState({ active: false, message: "" });
  const [classData, setClassData] = React.useState({
    class_name: "",
    class_section: "",
    class_subject: "",
    class_image: undefined,
    file_name: undefined,
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });

  const token = localStorage.getItem("token");
  const [loading, setLoading] = React.useState(false);
  const { url } = useGlobalContext();

  // get class data function
  const fetchClass = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${props.classId}`, {
        headers: { Authorization: token },
      });

      if (data) {
        setClassData({
          class_name: data.class_data.class_name,
          class_section: data.class_data.class_section,
          class_subject: data.class_data.class_subject,
          class_image: data.class_data.class_image
            ? Buffer.from(data.class_data.class_image).toString()
            : undefined,
          file_name: data.class_data.file_name,
        });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [props.classId, token, url]);

  // edit class function
  const editClass = async (e) => {
    const { class_name, class_section, class_subject, class_image, file_name } = classData;
    const { fileName } = selectedFile;
    let classImage = "";
    e.preventDefault();
    setLoading(true);
    if (class_name !== "" && class_name.trim() !== "") {
      try {
        if (class_image && !class_image.startsWith("https")) {
          classImage = await file_fns.fileUpload(e.target.class_image.files[0], axios, url, token);
        }
        if (!classImage?.startsWith("Error")) {
          const { data } = await axios.patch(
            `${url}/classes`,
            {
              class_id: props.classId,
              class_name,
              class_section,
              class_subject,
              class_image:
                classImage !== "" && !class_image.startsWith("https")
                  ? classImage
                  : class_image.startsWith("https")
                  ? class_image
                  : null,
              file_name: fileName !== "" ? fileName : file_name !== "" ? file_name : file_name,
            },
            { headers: { Authorization: token } }
          );
          if (data) {
            props.fetchClasses();
          }
          props.handleEditClass(-1);
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
        message: "Fill in the required fields with appropriate content before finalizing.",
      });
    }
    setLoading(false);
  };

  // class data onchange function
  const handleClassData = ({ name, value }) => {
    setClassData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    fetchClass();
  }, [fetchClass]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="custom-flex absolute top-0 left-0 w-full backdrop-blur-md min-h-screen z-10 ">
      {/* form background */}
      <DropDownError error={error} setError={setError} />
      <div
        className={`custom-flex custom-light-border z-10 p-5 bg-white my-10 rounded-lg shadow-md w-11/12 h-fit
                tablet:w-8/12
                laptop-s:w-6/12
                laptop-l:w-6/12`}
      >
        {/* form body */}
        <form
          method="POST"
          className="custom-flex flex-col text-center gap-5 w-full"
          onSubmit={(e) => editClass(e)}
        >
          {/* class name */}

          <EditClassCompiledInputFields classData={classData} handleClassData={handleClassData} />

          <EditClassCompiledFileComps
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setClassData={setClassData}
            handleClassData={handleClassData}
            classData={classData}
          />

          {/* create or cancel */}
          <div
            className="custom-flex gap-5 w-full
                    tablet:justify-end tablet:w-80"
          >
            <SubmitButton value={"EDIT"} />
            <CancelButton onClick={props.handleEditClass} />
          </div>
        </form>
      </div>
    </div>
  );
}
