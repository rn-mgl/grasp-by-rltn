import React from "react";
import axios from "axios";

// utils components
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import NavBarLogoLink from "../../COMPONENTS/GLOBAL COMPONENTS/IN-FILE COMPONENTS/NavBarLogoLink";

// function/global components
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

// signup components
import SignUpGraphicPanel from "../../COMPONENTS/AUTH COMPONENTS/SignUpGraphicPanel";
import SignUpForm from "../../COMPONENTS/AUTH COMPONENTS/SignUpForm";

export default function Signup() {
  const [authInput, setAuthInput] = React.useState({
    user_name: "",
    user_surname: "",
    user_gender: "",
    user_email: "",
    user_password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState({ active: false, message: "" });
  const { url } = useGlobalContext();
  const navigate = useNavigate();

  const handleInput = ({ name, value }) => {
    setAuthInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_name, user_surname, user_gender, user_email, user_password } = authInput;
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/authenticate/signup`, {
        user_name,
        user_surname,
        user_gender,
        user_email,
        user_password,
      });

      if (data.token) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("curr", `Bearer ${data.user._id}`);

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setError({
        active: true,
        message: <div>Please Fill Out All Fields and Enter Correct Information.</div>,
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="flex flex-col
                    laptop-s:flex-row"
    >
      <NavBarLogoLink />
      <SignUpGraphicPanel />

      <div
        className="custom-flex text-center flex-col gap-5 p-5 w-full rounded-lg font-Work mt-5
                  laptop-s:h-screen laptop-s:mt-0
                  4k:gap-10"
      >
        <div
          className="font-Poppins text-3xl font-bold
                        tablet:text-5xl
                        laptop-l:text-6xl
                        4k:text-8xl"
        >
          Sign Up
        </div>

        <SignUpForm
          handleSubmit={handleSubmit}
          authInput={authInput}
          handleInput={handleInput}
          error={error}
        />

        {error && <DropDownError error={error} setError={setError} />}
      </div>
    </div>
  );
}
