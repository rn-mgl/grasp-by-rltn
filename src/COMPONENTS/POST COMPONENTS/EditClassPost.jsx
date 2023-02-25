import React from "react";
import axios from "axios";

// edit post form components
import InputField from "../FORM COMPONENTS/InputField";
import TextArea from "../FORM COMPONENTS/TextArea";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";
import CancelButton from "../FORM COMPONENTS/CancelButton";
import AttachmentInput from "../FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../FORM COMPONENTS/AttachmentPreview";

// utils components
import Loading from "../GLOBAL COMPONENTS/Loading";
import DropDownError from "../ERROR COMPONENTS/DropDownError";

// global function components
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { Buffer } from "buffer";
import { useGlobalContext } from "../../context";

export default function EditClassPost(props) {
  const [error, setError] = React.useState({ active: false, message: "" });
  const [loading, setLoading] = React.useState(false);
  const [postData, setPostData] = React.useState({
    post_main_topic: "",
    post_text: "",
    post_file: "",
    file_name: "",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });

  const { url } = useGlobalContext();
  const class_id = window.location.pathname.split("/")[2];
  const post_id = props.post_id;
  const token = localStorage.getItem("token");

  const fetchPath =
    window.location.pathname === "/home"
      ? `${url}/home/${post_id}`
      : `${url}/classes/${class_id}/posts/${post_id}`;
  const updatePath =
    window.location.pathname === "/home"
      ? `${url}/home/${post_id}`
      : `${url}/classes/${class_id}/posts/${post_id}`;

  // get post data function
  const fetchPost = React.useCallback(async () => {
    try {
      const { data } = await axios.get(fetchPath, {
        headers: { Authorization: token },
      });
      if (data) {
        setPostData({
          post_main_topic: data.post_main_topic,
          post_text: data.post_text,
          post_file: data.post_file ? Buffer.from(data.post_file).toString() : null,
          file_name: data.file_name ? data.file_name : "",
        });
        setSelectedFile((prev) => {
          return {
            ...prev,
            fileUrl: data.post_file ? Buffer.from(data.post_file).toString() : null,
          };
        });
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, fetchPath]);

  // update class post function
  const handleUpdateClassPost = async (e) => {
    e.preventDefault();
    const { fileName } = selectedFile;
    const { post_file, post_main_topic, post_text } = postData;
    let postFile = "";
    setLoading(true);
    try {
      if (post_file && !post_file.startsWith("https")) {
        postFile = await file_fns.fileUpload(e.target.postFile.files[0], axios, url, token);
      }
      if (!postFile?.startsWith("Error")) {
        const { data } = await axios.patch(
          updatePath,
          {
            post_id,
            post_main_topic,
            post_text,
            post_file:
              postFile !== "" && !post_file.startsWith("https")
                ? postFile
                : post_file && post_file.startsWith("https")
                ? post_file
                : null,
            file_name: fileName !== "" ? fileName : null,
          },
          { headers: { Authorization: token } }
        );
        if (data) {
          props.fetchPage();
        }
        props.handlePostToEdit(-1);
      } else if (postFile?.startsWith("Error")) {
        setError({ active: true, message: postFile });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // onchange post data function
  const handlePostData = ({ name, value }) => {
    setPostData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="custom-flex fixed w-full h-screen top-0 left-0 z-10 backdrop-blur-lg">
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
          onSubmit={(e) => handleUpdateClassPost(e)}
        >
          <InputField
            placeholder={"POST MAIN TOPIC"}
            type={"text"}
            name={"post_main_topic"}
            value={postData.post_main_topic}
            required={true}
            onChange={handlePostData}
          />

          <TextArea
            onChange={handlePostData}
            placeholder={"Post Content"}
            name={"post_text"}
            value={postData.post_text}
          />

          {selectedFile.fileUrl && (
            <CancelButton
              onClick={() => {
                file_fns.handleRemoveFile(setSelectedFile);
                setPostData((prev) => {
                  return {
                    ...prev,
                    file_name: undefined,
                    post_file: undefined,
                  };
                });
              }}
              label={"REMOVE FILE"}
            />
          )}

          <AttachmentInput
            htmlFor={"postFile"}
            name={"post_file"}
            id={"postFile"}
            selectedFile={selectedFile}
            onChange1={handlePostData}
            onChange2={(e) => file_fns.handleFileSelection(e, setSelectedFile)}
            value={postData.post_file}
            primaryLabel={postData.post_file ? "CHANGE IMAGE" : "UPLOAD IMAGE"}
            secondaryLabel={!postData.post_file ? "UPLOAD IMAGE" : "CHANGE IMAGE"}
          />

          <AttachmentPreview
            className={"custom-flex flex-col custom-light-border py-3 px-0 laptop-s:w-8/12"}
            selectedFile={selectedFile}
            postData={postData}
          />

          <div
            className="custom-flex gap-5 w-full
                      tablet:justify-end tablet:w-80"
          >
            <SubmitButton value="CREATE" />
            <CancelButton onClick={props.handlePostToEdit} />
          </div>
        </form>
      </div>
    </div>
  );
}
