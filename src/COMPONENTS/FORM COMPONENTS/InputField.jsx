import React from "react";

export default function InputField(props) {
  return (
    <input
      className={`${props.className && props.className} custom-input w-full p-5 h-10
                disabled:text-gray-500
                      tablet:text-base
                      laptop-l:text-lg
                      4k:w-[45rem] 4k:text-3xl 4k:p-11`}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      required={props.required}
      disabled={props.disabled}
      value={props.value ? props.value : props.value === 0 ? 0 : ""}
      onChange={(e) => props.onChange(e.target)}
    />
  );
}
