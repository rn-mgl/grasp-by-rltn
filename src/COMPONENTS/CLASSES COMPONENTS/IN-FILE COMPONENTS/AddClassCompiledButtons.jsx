import React from "react";
import RadioButton from "../../FORM COMPONENTS/RadioButton";

export default function AddClass_CompiledButtons(props) {
  return (
    <div
      className="custom-flex gap-2 flex-col w-full
          4k:gap-6"
    >
      <div
        className="font-Poppins font-medium
          laptop-l:text-lg
          4k:text-4xl"
      >
        SET CLASS AS ACTIVE?
      </div>

      {/* button container */}
      <div
        className="custom-flex gap-8 w-full
              laptop-l:w-96 "
      >
        {/* button yes */}
        <RadioButton
          checked={props.classData?.class_is_ongoing}
          value={true}
          name={"class_is_ongoing"}
          id={"is_ongoing"}
          onChange={props.handleClassData}
          buttonLabel={"YES"}
        />

        {/* button no */}
        <RadioButton
          checked={!props.classData?.class_is_ongoing}
          value={false}
          name={"class_is_ongoing"}
          id={"not_ongoing"}
          onChange={props.handleClassData}
          buttonLabel={"NO"}
        />
      </div>
    </div>
  );
}
