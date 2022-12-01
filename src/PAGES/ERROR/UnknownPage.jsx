import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../IMAGES/GRASP LOGO.png";

export default function UnknownPage() {
  return (
    <div className="fixed w-full h-full top-0 left-0 custom-flex">
      <Link className="absolute top-0 left-2/4 -translate-x-2/4 mt-5" to={"/home"}>
        <img
          className="w-28
                    laptop-s:w-36
                    laptop-l:w-44"
          alt="logo"
          src={logo}
        />
      </Link>

      <div className="custom-flex flex-col">
        <div
          className="font-Poppins font-black text-pr-blk text-5xl custom-text-shadow select-none
                    tablet:text-7xl
                    laptop-s:text-8xl
                    laptop-l:text-9xl"
        >
          404
        </div>
        <div
          className="font-Poppins font-bold text-neutral-500 text-2xl select-none
                      tablet:text-4xl
                      laptop-s:text-5xl
                      laptop-l:text-6xl"
        >
          Page Not Found
        </div>
        <div
          className="font-Poppins font-light text-sm mt-5 select-none
                      tablet:text-base
                      laptop-s:text-lg
                      laptop-l:text-xl"
        >
          This address is not part of our site.
        </div>
        <Link
          className="custom-flex gap-2 text-pr-blk mt-3 hover:underline hover:scale-110 transition-all"
          to={"/home"}
        >
          <BiArrowBack />
          <div
            className="font-Poppins font-light text-sm 
                      tablet:text-base
                      laptop-s:text-lg
                      laptop-l:text-xl"
          >
            Home
          </div>
        </Link>
      </div>
    </div>
  );
}
