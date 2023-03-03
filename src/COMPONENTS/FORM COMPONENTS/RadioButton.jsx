import React from "react";

export default function RadioButton(props) {
  return (
    <label
      className={`${props.className} font-Poppins w-full custom-flex font-semibold text-base 
                custom-radio hover:bg-pr-gry duration-100 p-1           
               laptop-s:text-lg
                4k:text-3xl 4k:p-6`}
      htmlFor={props.id}
    >
      <input
        className="hidden peer"
        type="radio"
        checked={props.checked}
        value={props.value || undefined}
        name={props.name}
        id={props.id}
        onChange={(e) => props.onChange(e.target)}
      />
      <div
        className={`peer-checked:bg-pr-blk peer-checked:text-pr-wht w-full custom-flex p-1 rounded-md`}
      >
        {props.buttonLabel}
      </div>
    </label>
  );
}
