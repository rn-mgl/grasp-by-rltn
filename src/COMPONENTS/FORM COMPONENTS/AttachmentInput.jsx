import React from "react";

export default function AttachmentInput(props) {
  return (
    <label
      className={`${
        props.hasSubmitted && "hidden"
      } custom-input w-full custom-flex bg-white cursor-pointer text-sm font-Poppins font-semibold hover:shadow-md
                tablet:text-base
                laptop-l:text-lg`}
      htmlFor={props.htmlFor}
    >
      <input
        className="hidden"
        type="file"
        name={props.name}
        id={props.id}
        onChange={(e) => {
          props.onChange1(e.target);
          props.onChange2(e);
        }}
      />

      <div>{props.selectedFile.fileUrl ? props.secondaryLabel : props.primaryLabel}</div>
    </label>
  );
}
