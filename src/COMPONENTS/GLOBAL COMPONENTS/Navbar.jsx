import React from "react";
import SidePanel from "./SidePanel";
import { Outlet, useLocation } from "react-router-dom";
import NavBarBaseNav from "./IN-FILE COMPONENTS/NavBarBaseNav";
import NavBarGlobalTasks from "./IN-FILE COMPONENTS/NavBarGlobalTasks";
import NavBarLogoLink from "./IN-FILE COMPONENTS/NavBarLogoLink";
import SidePanelIcon from "./IN-FILE COMPONENTS/SidePanelIcon";

export default function Navbar() {
  const [panelVisible, setPanelVisible] = React.useState(false);
  const { pathname: url } = useLocation();

  const token = localStorage.getItem("token");

  const handlePanel = () => {
    setPanelVisible((prev) => !prev);
  };

  React.useEffect(() => {
    if (!token) {
      setPanelVisible(false);
    }
  }, [token]);
  return (
    <>
      <NavBarLogoLink />
      {panelVisible && <SidePanel />}
      <div
        className={`mobile-s:p-5 custom-navbar
          laptop-s:py-5 laptop-s:px-10
          4k:py-9`}
      >
        {(url === "/home" || url === "/classes") && <NavBarBaseNav />}
        {(url.endsWith("/ongoing") || url.endsWith("/missing") || url.endsWith("/done")) && (
          <NavBarGlobalTasks />
        )}
      </div>
      <SidePanelIcon panelVisible={panelVisible} handlePanel={handlePanel} />
      <Outlet />
    </>
  );
}
