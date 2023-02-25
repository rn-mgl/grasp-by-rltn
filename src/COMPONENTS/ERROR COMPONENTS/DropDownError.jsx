import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function DropDownError({ error, setError }) {
  if (error?.active) {
    setTimeout(() => {
      setError({ active: false, message: "" });
    }, [5000]);
  }
  const handleCloseError = () => {
    setError(false);
  };
  return (
    error?.active && (
      <div
        className={`fixed ${
          !error?.active ? "-top-full" : "top-5"
        }         bg-pr-blk custom-flex gap-5 rounded-lg text-pr-red transition-all left-2/4 -translate-x-2/4 w-11/12 text-center
                  font-Poppins font-medium text-sm p-3 px-5 shadow-md break-words
                  tablet:text-base
                  mobile-l:w-80
                  `}
      >
        <div>
          {error.message.response?.data?.msg
            ? error.message.response?.data?.msg
            : error.message.message
            ? error.message.message
            : "Server Error. Please try again later."}
        </div>
        <div>
          <IoMdCloseCircleOutline className="scale-125 cursor-pointer" onClick={handleCloseError} />
        </div>
      </div>
    )
  );
}
