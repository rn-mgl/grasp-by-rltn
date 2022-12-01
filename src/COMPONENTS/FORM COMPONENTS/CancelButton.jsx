import React from "react";

export default function CancelButton(props) {
  return (
    <button
      className={`custom-btn custom-flex ${
        props.label ? "bg-pr-wht py-2 custom-light-border" : "bg-pr-gry"
      } w-full text-base
            laptop-s:text-lg`}
      type="button"
      onClick={props.onClick}
    >
      {props.label ? props.label : "CANCEL"}
    </button>
  );
}
