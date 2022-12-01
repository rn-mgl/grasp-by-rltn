import React from "react";

// form components
import AttachmentInput from "../../FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../../FORM COMPONENTS/AttachmentPreview";
import CancelButton from "../../FORM COMPONENTS/CancelButton";

// global functions
import * as file_fns from "../../../FUNCTIONS/attachmentFunctions";

export default function EditClassCompiledFileComps(props) {
  return (
    <>
      {/* upload image */}
      {props.selectedFile?.fileUrl && (
        <CancelButton
          onClick={() => {
            file_fns.handleRemoveFile(props.setSelectedFile);
            props.setClassData((prev) => {
              return {
                ...prev,
                class_image: undefined,
                file_name: undefined,
              };
            });
          }}
          label={"REMOVE FILE"}
        />
      )}

      <AttachmentInput
        htmlFor={"class_image"}
        type={"file"}
        name={"class_image"}
        id={"class_image"}
        selectedFile={props.selectedFile}
        onChange1={props.handleClassData}
        onChange2={(e) => file_fns.handleFileSelection(e, props.setSelectedFile)}
        value={props.classData?.class_image}
        primaryLabel={"UPLOAD CLASS IMAGE"}
        secondaryLabel={"CHANGE CLASS IMAGE"}
      />

      {/* file preview */}

      <AttachmentPreview
        className={"custom-flex flex-col custom-light-border py-3 px-0 laptop-s:w-8/12"}
        selectedFile={props.selectedFile}
        postData={props.classData}
      />
    </>
  );
}
