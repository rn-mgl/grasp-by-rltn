import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm transition-all custom-flex gap-5">
      <div className="animate-spin custom-flex flex-col gap-5 w-16">
        <div className="custom-flex">
          <div className="w-5 h-5 bg-gradient-to-r from-pr-blu to-pr-grn rounded-full shadow-md"></div>
        </div>
        <div className="custom-flex w-full ">
          <div className="w-5 h-5 bg-gradient-to-r from-pr-ylw to-pr-orng rounded-full shadow-md mr-auto"></div>
          <div className="w-5 h-5 bg-gradient-to-r from-pr-orng to-pr-red rounded-full shadow-md"></div>
        </div>
      </div>
    </div>
  );
}
