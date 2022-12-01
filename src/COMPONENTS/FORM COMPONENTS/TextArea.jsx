import React from "react";

export default function TextArea(props) {
  return (
    <textarea
      className="custom-light-border font-Work text-base w-full p-5 resize-none"
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e.target)}
      id=""
      rows={props.rows}
    ></textarea>
  );
}
