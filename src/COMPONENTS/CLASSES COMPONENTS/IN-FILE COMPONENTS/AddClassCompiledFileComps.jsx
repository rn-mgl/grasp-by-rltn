import React from "react";

import CancelButton from "../../FORM COMPONENTS/CancelButton";
import AttachmentInput from "../../FORM COMPONENTS/AttachmentInput";
import AttachmentPreview from "../../FORM COMPONENTS/AttachmentPreview";

import * as file_fns from "../../../FUNCTIONS/attachmentFunctions";

export default function AddClass_CompiledFileComps(props) {
  return (
    <>
      {/* remove file button if a file is selected */}
      {props.selectedFile?.fileUrl && (
        <CancelButton
          onClick={() => {
            file_fns.handleRemoveFile(props.setSelectedFile);
            props.setClassData((prev) => {
              return {
                ...prev,
                class_image: "",
              };
            });
          }}
          label={"REMOVE FILE"}
        />
      )}

      {/* upload image */}
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

      {/* user message */}
      <div className="font-Work text-center text-sm opacity-70 text-pr-grn">
        UPLOAD FILES 10MB AND BELOW TO AVOID ERRORS AND HAVE EFFICIENT PERFORMANCE
      </div>

      {/* file preview */}
      <AttachmentPreview
        className={"custom-flex flex-col custom-light-border py-3 px-0 laptop-s:w-8/12"}
        selectedFile={props.selectedFile}
      />
    </>
  );
}
