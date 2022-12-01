import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import { useGlobalContext } from "../../context";
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import SidePanelEssentials from "./IN-FILE COMPONENTS/SidePanelEssentials";
import SidePanelGlobalTasks from "./IN-FILE COMPONENTS/SidePanelGlobalTasks";
import SidePanelClasses from "./IN-FILE COMPONENTS/SidePanelClasses";

export default function SidePanel() {
  const [classes, setClasses] = React.useState([]);
  const [error, setError] = React.useState({ active: false, message: "" });

  const navigate = useNavigate();
  const paths = window.location.pathname.split("/");
  const currentPath = window.location.pathname;
  const globalTask = paths[1] === "tasks";
  const token = localStorage.getItem("token");

  const { url } = useGlobalContext();

  const fetchClasses = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes`, { headers: { Authorization: token } });

      if (data.classes) {
        setClasses(data.classes);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [token, url]);

  React.useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`${
        (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") && "hidden"
      }         w-screen h-screen max-h-screen overflow-scroll overflow-x-hidden scroll-smooth bg-white fixed top-0 left-0 drop-shadow-lg z-10 
                tablet:w-72
                laptop-l:w-96
                4k:w-[35rem]`}
    >
      <DropDownError error={error} setError={setError} />
      <div
        className="flex flex-col mt-14 float-left w-full
                laptop-s:gap-2 laptop-s:w-10/12
                laptop-l:gap-2 laptop-l:w-10/12
                4k:mt-32 4k:gap-5"
      >
        <SidePanelEssentials />
        <div className="custom-divider w-full ml-20" />

        {/* if path is class task */}
        {globalTask && <SidePanelGlobalTasks />}
        {classes.length > 0 && (
          <div className="custom-flex font-Work opacity-50">Enrolled Classes</div>
        )}
        {/* enrolled classes */}
        {classes.map((data) => {
          return <SidePanelClasses key={data.class_id} data={data} />;
        })}
        {classes.length > 0 && <div className="custom-divider ml-20" />}

        {/* log out */}

        <div
          className="custom-panel-bars px-4 cursor-pointer
                  laptop-l:text-base laptop-l:w-full 
                  4k:text-3xl 4k:px-16"
          onClick={handleLogOut}
        >
          <BiLogOut
            className="laptop-l:scale-110
                    4k:scale-[150%]"
            size={"1.5rem"}
          />
          <div>Log Out</div>
        </div>
      </div>
    </div>
  );
}
