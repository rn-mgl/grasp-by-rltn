import React from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function MessagePage({ header, body, fetch, footer }) {
  return (
    <div className="custom-flex flex-col w-11/12 mx-auto">
      <div
        className="font-Poppins font-bold text-pr-blk text-lg select-none text-center capitalize
              tablet:text-xl
              laptop-s:text-xl"
      >
        {header}
      </div>
      <div className="font-Poppins font-medium text-neutral-500 text-sm select-none text-center">
        {body}
      </div>
      <div
        onClick={fetch}
        className="custom-btn custom-flex gap-3 bg-pr-blk text-pr-wht rounded-r-full rounded-l-full font-Poppins font-normal text-sm mt-5 select-none
                hover:scale-105 transition-all"
      >
        {footer}
        <FiRefreshCw />
      </div>
    </div>
  );
}
