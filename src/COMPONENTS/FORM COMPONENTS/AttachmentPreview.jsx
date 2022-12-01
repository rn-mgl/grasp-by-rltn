import React from "react";
import logo from "../../IMAGES/GRASP LOGO.png";

export default function AttachmentPreview(props) {
  return (
    props.selectedFile.fileUrl && (
      <div className="custom-flex w-full h-fit">
        <div
          className={
            props.className
              ? `${props.className}`
              : "custom-flex flex-col bg-white custom-light-border py-3 px-0"
          }
        >
          {props.selectedFile.isImage ||
          props.selectedFile.fileUrl.endsWith(".jpg") ||
          props.selectedFile.fileUrl.endsWith(".png") ? (
            <img
              className={`max-h-36 rounded-lg`}
              src={props.selectedFile.fileUrl}
              alt="selected file"
            />
          ) : (
            <img className="max-h-16" src={logo} alt="holder" />
          )}

          <div className="custom-divider my-4 w-full" />
          <div className="font-Poppins font-light">
            {props.selectedFile.fileName
              ? props.selectedFile.fileName
              : props.postData.file_name
              ? props.postData.file_name
              : "Current Uploaded File"}
          </div>
        </div>
      </div>
    )
  );
}
