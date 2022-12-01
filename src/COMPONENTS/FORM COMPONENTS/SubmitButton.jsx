import React from "react";

export default function SubmitButton(props) {
  return (
    <input
      className="custom-btn custom-flex bg-pr-blk text-pr-wht w-full text-base
                laptop-s:text-lg"
      type="submit"
      value={props.value}
    />
  );
}
