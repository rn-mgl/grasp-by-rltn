import React from "react";

export default function MessagePop(props) {
  if (props.messagePop.active) {
    setTimeout(() => {
      props.setMessagePop({ active: false, message: "" });
    }, [3000]);
  }
  return (
    <div
      className={`fixed ${
        !props.messagePop?.active ? "-top-full" : "top-5"
      }         bg-pr-blk custom-flex gap-5 rounded-lg text-pr-grn transition-all left-2/4 -translate-x-2/4 w-11/12
            font-Poppins font-medium text-sm p-3 px-5 shadow-md break-words z-10
            tablet:text-base
            mobile-l:w-80
            `}
    >
      <div>{props.messagePop?.message}</div>
    </div>
  );
}
