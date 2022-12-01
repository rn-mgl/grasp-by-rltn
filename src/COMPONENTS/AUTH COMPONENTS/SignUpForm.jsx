import React from "react";

// form components
import RadioButton from "../../COMPONENTS/FORM COMPONENTS/RadioButton";
import InputField from "../../COMPONENTS/FORM COMPONENTS/InputField";
import SubmitButton from "../../COMPONENTS/FORM COMPONENTS/SubmitButton";

export default function SignUpForm(props) {
  return (
    <form
      className="custom-flex flex-col gap-5 w-full
            laptop-l:gap-7
            4k:gap-8"
      onSubmit={props.handleSubmit}
    >
      <div
        className="custom-flex flex-col gap-5 w-full
                tablet:w-7/12
                laptop-l:gap-7"
      >
        <InputField
          placeholder={"name*"}
          type={"text"}
          name={"user_name"}
          value={props.authInput.user_name}
          required={true}
          onChange={props.handleInput}
          className={props.error.active && "border-pr-red border-2"}
        />

        <InputField
          placeholder={"surname*"}
          type={"text"}
          name={"user_surname"}
          value={props.authInput.user_surname}
          required={true}
          onChange={props.handleInput}
          className={props.error.active && "border-pr-red border-2"}
        />

        <InputField
          placeholder={"e-mail*"}
          type={"text"}
          name={"user_email"}
          value={props.authInput.user_email}
          required={true}
          onChange={props.handleInput}
          className={props.error.active && "border-pr-red border-2"}
        />

        <InputField
          placeholder={"password*"}
          type={"password"}
          name={"user_password"}
          value={props.authInput.user_password}
          required={true}
          onChange={props.handleInput}
          className={props.error.active && "border-pr-red border-2"}
        />
      </div>

      <div
        className="flex gap-2 flex-col
              4k:gap-6"
      >
        <div
          className="laptop-l:text-xl
                  4k:text-4xl"
        >
          Gender
        </div>

        <div className="flex gap-8">
          <RadioButton
            checked={props.authInput.user_gender === "M"}
            value={"M"}
            name={"user_gender"}
            id={"Male"}
            onChange={props.handleInput}
            buttonLabel={"Male"}
            className={props.error.active && "border-pr-red border-2"}
          />

          <RadioButton
            checked={props.authInput.user_gender === "F"}
            value={"F"}
            name={"user_gender"}
            id={"Female"}
            onChange={props.handleInput}
            buttonLabel={"Female"}
            className={props.error.active && "border-pr-red border-2"}
          />
        </div>
      </div>
      <div
        className="w-full
              tablet:w-7/12"
      >
        <SubmitButton value={"SIGNUP"} />
      </div>
    </form>
  );
}
