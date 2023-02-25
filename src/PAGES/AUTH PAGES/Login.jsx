import React from "react";
import axios from "axios";

// utils component
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import NavBarLogoLink from "../../COMPONENTS/GLOBAL COMPONENTS/IN-FILE COMPONENTS/NavBarLogoLink";

// login components
import LogInGraphicPanel from "../../COMPONENTS/AUTH COMPONENTS/LogInGraphicPanel";
import LogInForm from "../../COMPONENTS/AUTH COMPONENTS/LogInForm";

// function/global components
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

export default function Login() {
  const [authInput, setAuthInput] = React.useState({
    cand_user_email: "",
    cand_user_password: "",
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
    const { cand_user_email, cand_user_password } = authInput;
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/authenticate/login`, {
        cand_user_email,
        cand_user_password,
      });

      if (data.token) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("curr", data.user._id);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="flex flex-col-reverse
                  laptop-s:flex-row"
    >
      <NavBarLogoLink />
      <div
        className="custom-flex text-center flex-col gap-5 p-10 w-full rounded-lg mt-10
                    laptop-s:h-screen laptop-s:mt-0
                    4k:gap-10"
      >
        <div
          className="font-Poppins text-3xl font-bold
                      tablet:text-5xl
                      laptop-l:text-6xl
                      4k:text-8xl"
        >
          Login
        </div>
        <LogInForm
          handleSubmit={handleSubmit}
          error={error}
          handleInput={handleInput}
          authInput={authInput}
        />
        {error && <DropDownError error={error} setError={setError} />}
      </div>

      <LogInGraphicPanel />
    </div>
  );
}
