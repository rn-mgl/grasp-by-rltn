import React from "react";

// form components
import InputField from "../../COMPONENTS/FORM COMPONENTS/InputField";
import SubmitButton from "../../COMPONENTS/FORM COMPONENTS/SubmitButton";

export default function LogInForm(props) {
  return (
    <form
      className="custom-flex flex-col gap-5 w-full
                laptop-l:gap-7"
      onSubmit={props.handleSubmit}
    >
      <div
        className="custom-flex flex-col gap-5 w-full
                tablet:w-7/12
                laptop-l:gap-7"
      >
        <InputField
          placeholder={"e-mail*"}
          type={"text"}
          name={"cand_user_email"}
          value={props.authInput.cand_user_email}
          onChange={props.handleInput}
          className={props.error.active && "border-pr-red border-2"}
        />

        <InputField
          placeholder={"password*"}
          type={"password"}
          name={"cand_user_password"}
          value={props.authInput.cand_user_password}
          onChange={props.handleInput}
          className={props.error.active && "border-pr-red border-2"}
        />
      </div>
      <div
        className="w-full
              tablet:w-7/12"
      >
        <SubmitButton value={"LOGIN"} />
      </div>
    </form>
  );
}
