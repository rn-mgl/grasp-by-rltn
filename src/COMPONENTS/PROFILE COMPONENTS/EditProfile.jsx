import React from "react";
import axios from "axios";

// edit profile form components
import InputField from "../FORM COMPONENTS/InputField";
import RadioButton from "../FORM COMPONENTS/RadioButton";
import AttachmentInput from "../FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../FORM COMPONENTS/AttachmentPreview";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";
import CancelButton from "../FORM COMPONENTS/CancelButton";

// global function components
import { Buffer } from "buffer";
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { useGlobalContext } from "../../context";

// utils components
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import Loading from "../GLOBAL COMPONENTS/Loading";

export default function EditProfile(props) {
  const [error, setError] = React.useState({ active: false, message: "" });
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    user_name: "",
    user_surname: "",
    user_gender: "",
    user_image: "",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });

  const token = localStorage.getItem("token");
  const user = parseInt(localStorage.getItem("curr"));
  const { url } = useGlobalContext();

  const fetchUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/users/${user}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setUserData({
          user_name: data.user_name,
          user_surname: data.user_surname,
          user_gender: data.user_gender,
          user_image: data.user_image ? Buffer.from(data.user_image).toString() : undefined,
        });
        setSelectedFile((prev) => {
          return {
            ...prev,
            fileUrl: data.user_image ? Buffer.from(data.user_image).toString() : undefined,
          };
        });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, url, user]);

  const updateProfile = async (e) => {
    const { user_name, user_surname, user_gender, user_image } = userData;
    let userImage = "";
    e.preventDefault();
    setLoading(true);
    try {
      if (user_image && !user_image?.startsWith("https")) {
        userImage = await file_fns.fileUpload(e.target.userImage.files[0], axios, url, token);
      }

      if (!userImage?.startsWith("Error")) {
        const { data } = await axios.patch(
          `${url}/users/${user}`,
          {
            user_id: parseInt(user),
            user_name,
            user_surname,
            user_gender,
            user_image:
              userImage !== "" && !user_image.startsWith("https")
                ? userImage
                : user_image?.startsWith("https")
                ? user_image
                : null,
          },
          { headers: { Authorization: token } }
        );
        if (data) {
          props.fetchUserData();
        }
        props.handleCanEditProfile(false);
      } else if (userImage?.startsWith("Error")) {
        setError({ active: true, message: userImage });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  };

  const handleEditData = ({ name, value }) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        loading && "transition-all"
      } w-full min-h-screen h-auto overflow-y-scroll fixed custom-flex items-start top-0 left-0 backdrop-blur-md z-10
        tablet:items-center`}
    >
      <DropDownError error={error} setError={setError} />
      <form
        className="custom-flex flex-col gap-3 bg-white absolute p-10 rounded-lg shadow-md  
            laptop-l:gap-7
            4k:gap-8"
        onSubmit={(e) => updateProfile(e)}
      >
        <div className="custom-flex flex-col gap-3 w-full">
          <div className="w-full">
            <div className="font-Work">Name</div>
            <InputField
              placeholder={"name"}
              type={"text"}
              name={"user_name"}
              required={true}
              value={userData.user_name}
              onChange={handleEditData}
            />
          </div>

          <div className="w-full">
            <div className="font-Work">Surname</div>

            <InputField
              placeholder={"surname"}
              type={"text"}
              name={"user_surname"}
              required={true}
              value={userData.user_surname}
              onChange={handleEditData}
            />
          </div>
        </div>

        <div
          className="flex gap-2 flex-col
              4k:gap-6"
        >
          <div
            className="laptop-l:text-xl text-center font-Poppins font-medium
                  4k:text-4xl"
          >
            GENDER
          </div>

          <div className="flex gap-5 ">
            <RadioButton
              checked={userData.user_gender === "M"}
              value={"M"}
              name={"user_gender"}
              id={"Male"}
              onChange={handleEditData}
              buttonLabel={"Male"}
            />

            <RadioButton
              checked={userData.user_gender === "F"}
              value={"F"}
              name={"user_gender"}
              id={"Female"}
              onChange={handleEditData}
              buttonLabel={"Female"}
            />
          </div>
        </div>

        {selectedFile.fileUrl && (
          <CancelButton
            onClick={() => {
              file_fns.handleRemoveFile(setSelectedFile);
              setUserData((prev) => {
                return {
                  ...prev,
                  user_image: "",
                };
              });
            }}
            label={"REMOVE FILE"}
          />
        )}

        <AttachmentInput
          name={"user_image"}
          htmlFor={"userImage"}
          id={"userImage"}
          onChange1={handleEditData}
          onChange2={(e) => file_fns.handleFileSelection(e, setSelectedFile)}
          value={userData.user_image}
          selectedFile={selectedFile}
          primaryLabel={"UPLOAD IMAGE"}
          secondaryLabel={"CHANGE IMAGE"}
        />
        <AttachmentPreview selectedFile={selectedFile} postData={userData} />
        <p className="font-Work text-pr-grn font-light text-sm">
          FILES SHOULD BE BELOW 10MB TO AVOID ERRORS
        </p>
        <div
          className="custom-flex gap-3
                    tablet:flex-row"
        >
          <SubmitButton value="UPDATE" />
          <CancelButton onClick={props.handleCanEditProfile} />
        </div>
      </form>
    </div>
  );
}
