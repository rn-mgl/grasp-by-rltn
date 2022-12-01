import React from "react";

import InputField from "../../FORM COMPONENTS/InputField";

export default function EditClassCompiledInputFields(props) {
  return (
    <>
      <InputField
        placeholder={"CLASS NAME*"}
        type={"text"}
        name={"class_name"}
        required={true}
        value={props.classData?.class_name}
        onChange={props.handleClassData}
      />
      <InputField
        placeholder={"CLASS SECTION"}
        type={"text"}
        name={"class_section"}
        value={props.classData?.class_section}
        onChange={props.handleClassData}
      />
      <InputField
        placeholder={"CLASS SUBJECT"}
        type={"text"}
        name={"class_subject"}
        value={props.classData?.class_subject}
        onChange={props.handleClassData}
      />
    </>
  );
}
