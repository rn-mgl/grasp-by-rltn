import React from "react";
import LandingImage from "../IMAGES/GRASP LANDING.png";
import { Link, useNavigate } from "react-router-dom";
import NavBarLogoLink from "../COMPONENTS/GLOBAL COMPONENTS/IN-FILE COMPONENTS/NavBarLogoLink";

export default function Landing() {
  const user = localStorage.getItem("curr");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      token &&
      user &&
      token.startsWith("Bearer ") &&
      user.toLocaleLowerCase() === user.toLocaleUpperCase()
    ) {
      navigate("/home");
    }
  }, [token, user, navigate]);

  return (
    <div
      className="p-2 mt-14
                mobile-l:p-5
                laptop-s:px-20
                laptop-s:mt-20
                4k:mt-40"
    >
      <NavBarLogoLink />
      <div
        className="custom-flex flex-col
                  laptop-s:flex-row"
      >
        <div className="w-full laptop-s:w-8/12">
          <div
            className="font-Poppins font-bold leading-tight text-3xl text-center
                          tablet:text-6xl
                          laptop-s:text-6xl laptop-s:text-left laptop-s:leading-tight
                          laptop-l:text-[5rem] laptop-l:leading-tight
                          4k:text-[10.5rem]"
          >
            we'll put the pieces in your hands for you to grasp your dreams
          </div>
          <div
            className="font-Work mt-2 text-center text-sm leading-snug 
                      mobile-l:m-5 mobile-l:text-base 
                      tablet:m-10 tablet:text-lg 
                      laptop-s:text-xl laptop-s:text-left laptop-s:mx-0 laptop-s:my-5
                      laptop-l:text-2xl
                      4k:text-5xl 4k:leading-normal"
          >
            we have the tools, you have the goal
          </div>
          <div
            className="custom-flex mt-10 flex-col gap-3 text-center 
                      tablet:flex-row tablet:gap-5
                      laptop-s:justify-start"
          >
            <Link
              className="custom-flex custom-btn p-6 bg-pr-blk text-pr-wht w-10/12 h-10 
                        mobile-l:w-11/12 
                        tablet:w-48
                        laptop-l:p-8 laptop-l:text-2xl
                        4k:w-80 4k:text-4xl 4k:h-auto"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className="custom-flex custom-btn p-6 bg-pr-gry w-10/12 h-10
                        mobile-l:w-11/12
                        tablet:w-48
                        laptop-l:p-8 laptop-l:text-2xl
                        4k:w-80 4k:text-4xl 4k:h-auto"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="custom-flex mt-10 laptop-s:mt-0 laptop-s:w-4/12">
          <img
            src={LandingImage}
            alt="landing"
            className="w-36
                      mobile-l:w-44
                      tablet:w-56
                      laptop-s:w-64
                      laptop-l:w-72
                      4k:w-[35rem]"
          />
        </div>
      </div>
    </div>
  );
}
