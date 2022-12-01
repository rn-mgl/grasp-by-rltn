import React from "react";

export default function SignUpGraphicPanel() {
  return (
    <div
      className="custom-flex flex-col gap-0 bg-gradient-to-br from-pr-ylw to-pr-grn w-full h-96
                laptop-s:h-screen"
    >
      <div
        className="text-pr-bkl text-3xl font-Poppins font-semibold
                  tablet:text-5xl
                  laptop-l:text-6xl
                  4k:text-8xl"
      >
        Hello!
      </div>
      <div
        className="text-pr-bkl text-sm font-Work
              tablet:text-base
              laptop-l:text-lg
              4k:text-3xl"
      >
        join us by creating an account
      </div>
    </div>
  );
}
