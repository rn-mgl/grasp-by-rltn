import React from "react";
import axios from "axios";
import AttachmentInput from "../../COMPONENTS/FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../../COMPONENTS/FORM COMPONENTS/AttachmentPreview";
import InputField from "../../COMPONENTS/FORM COMPONENTS/InputField";
import TextArea from "../../COMPONENTS/FORM COMPONENTS/TextArea";
import SubmitButton from "../../COMPONENTS/FORM COMPONENTS/SubmitButton";
import CancelButton from "../../COMPONENTS/FORM COMPONENTS/CancelButton";
import * as file_fns from "../../FUNCTIONS/attachmentFunctions";
import { useGlobalContext } from "../../context";
import DropDownError from "../ERROR COMPONENTS/DropDownError";

export default function WritePost(props) {
  const [canWritePost, setCanWritePost] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });
  const [postData, setPostData] = React.useState({
    post_main_topic: "",
    post_text: "",
    post_file: "",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    fileName: "",
    fileUrl: undefined,
    isImage: false,
  });

  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();
  const postPath = props.writePostType === "class" ? `classes/${props.class_id}/posts` : `home`;

  const uploadPost = async (e) => {
    e.preventDefault();
    const { fileName } = selectedFile;
    const { post_main_topic, post_text, post_file } = postData;
    let postFile = "";

    setLoading(true);
    if (post_main_topic !== "" && post_main_topic.trim() !== "") {
      try {
        if (post_file) {
          postFile = await file_fns.fileUpload(e.target.post_file.files[0], axios, url, token);
        }
        if (!postFile?.startsWith("Error")) {
          const { data } = await axios.post(
            `${url}/${postPath}`,
            {
              post_main_topic,
              post_text,
              post_file: postFile !== "" ? postFile : null,
              file_name: fileName !== "" ? fileName : null,
            },
            { headers: { Authorization: token } }
          );

          if (data) {
            props.fetchPage();
          }
        } else if (postFile?.startsWith("Error")) {
          setError({ active: true, message: postFile });
        }
        setSelectedFile({
          fileName: "",
          fileUrl: undefined,
          isImage: false,
        });
        setPostData({
          post_main_topic: "",
          post_text: "",
          post_file: "",
        });
        setCanWritePost((prev) => !prev);
      } catch (error) {
        console.log(error);
        setError({ active: true, message: error?.response?.data?.msg });
      }
    } else {
      setError({
        active: true,
        message: "Fill in the required fields with appropriate content before posting.",
      });
    }
    setLoading(false);
  };

  const handlePostData = ({ name, value }) => {
    setPostData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCanWritePost = () => {
    setSelectedFile({
      fileName: "",
      fileUrl: undefined,
      isImage: false,
    });
    setPostData({
      post_main_topic: "",
      post_text: "",
      post_file: "",
    });
    setCanWritePost((prev) => !prev);
  };

  return (
    <React.Fragment>
      <DropDownError error={error} setError={setError} />
      {canWritePost ? (
        // render if write post is clicked
        <div className={`${loading && "blur-[1px]"} custom-light-border min-h-14`}>
          <form
            method="POST"
            className="custom-flex  flex-col gap-4 "
            onSubmit={(e) => uploadPost(e)}
          >
            <InputField
              placeholder={"MAIN TOPIC*"}
              type={"text"}
              name={"post_main_topic"}
              value={postData.post_main_topic}
              onChange={handlePostData}
              required={true}
            />
            <TextArea
              placeholder={"TOPIC TEXT CONTENT"}
              name={"post_text"}
              value={postData.post_text}
              onChange={handlePostData}
              rows={6}
            />
            {selectedFile?.fileUrl && (
              <CancelButton
                label={"REMOVE FILE"}
                onClick={() => {
                  file_fns.handleRemoveFile(setSelectedFile);
                  setPostData((prev) => {
                    return {
                      ...prev,
                      post_file: undefined,
                    };
                  });
                }}
              />
            )}

            <AttachmentInput
              name={"post_file"}
              id={"post_file"}
              onChange1={handlePostData}
              onChange2={(e) => file_fns.handleFileSelection(e, setSelectedFile)}
              value={postData.post_file}
              selectedFile={selectedFile}
              primaryLabel={"ADD FILE"}
              secondaryLabel={"CHANGE FILE"}
            />
            <div className="font-Work text-center text-sm opacity-70 text-pr-grn">
              UPLOAD FILES 10MB AND BELOW TO AVOID ERRORS AND HAVE EFFICIENT PERFORMANCE
            </div>
            <AttachmentPreview selectedFile={selectedFile} />
            {/* upload buttons : post or cancel */}
            <div
              className="custom-flex gap-5
                        tablet:justify-end"
            >
              <SubmitButton value="POST" />
              <CancelButton onClick={handleCanWritePost} />
            </div>
          </form>
        </div>
      ) : (
        // render default write post (WRITE POST NOT CLICKED)
        <div
          className="flex font-Poppins items-center custom-light-border w-full p-6 rounded-lg h-14 cursor-pointer hover:border-pr-grn
              tablet:h-28
             "
          onClick={handleCanWritePost}
        >
          <div className="opacity-50">Write Post</div>
        </div>
      )}
    </React.Fragment>
  );
}
