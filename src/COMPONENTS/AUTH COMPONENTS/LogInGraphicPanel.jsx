import React from "react";

export default function LogInGraphicPanel() {
  return (
    <div
      className="custom-flex flex-col gap-3 bg-gradient-to-br from-pr-blu to-pr-grn w-full p-6 h-80
            laptop-s:h-screen laptop-s:mt-0
            4k:gap-5"
    >
      <div
        className="text-pr-wht text-3xl font-Poppins font-semibold mt-5
                tablet:text-5xl
                laptop-s:mt-0
                laptop-l:text-6xl
                4k:text-8xl"
      >
        Welcome!
      </div>
      <div
        className="text-pr-wht text-sm font-Work text-center
                  tablet:text-base
                  laptop-l:text-lg
                  4k:text-3xl"
      >
        please enter your email and password to login
      </div>
    </div>
  );
}
