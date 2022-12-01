import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function SidePanelIcon(props) {
  const token = localStorage.getItem("token");
  const currentPath = window.location.pathname;
  const menuPosition = props.panelVisible ? "fixed" : "absolute";

  return (
    token && (
      <div className={`top-5 z-10 ${menuPosition}`}>
        {props.panelVisible ? (
          <AiOutlineClose
            className={`${
              (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") &&
              "hidden"
            }         cursor-pointer relative
                    hover:bg-pr-gry p-2 rounded-full transition-all
                    left-10
                    laptop-s:scale-105 
                    laptop-l:scale-125 
                    4k:right-16 4k:top-16 4k:scale-[200%] `}
            size="2.2rem"
            onClick={props.handlePanel}
          />
        ) : (
          <AiOutlineMenu
            className={`${
              (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") &&
              "hidden"
            } cursor-pointer relative
                    hover:bg-pr-gry p-2 rounded-full transition-all
                    left-10
                    laptop-s:scale-105 
                    laptop-l:scale-125 
                    4k:right-16 4k:top-16 4k:scale-[200%] `}
            size="2.2rem"
            onClick={props.handlePanel}
          />
        )}
      </div>
    )
  );
}
