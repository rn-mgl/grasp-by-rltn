import React from "react";

export default function RadioButton(props) {
  return (
    <label
      className={`${props.className} font-Poppins w-20 custom-flex font-semibold text-sm 
                custom-radio hover:bg-pr-gry duration-100 p-0.5
                tablet:text-base tablet:w-36
                laptop-l:text-lg 
                4k:w-64 4k:text-3xl 4k:p-6`}
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
