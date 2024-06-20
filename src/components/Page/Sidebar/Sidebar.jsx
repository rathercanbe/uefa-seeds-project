import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SidebarContent from "./SidebarContent";

const Sidebar = ({ sidebar_type }) => {
  const [hideButton, setHideButton] = useState(true);

  const hideSidebar = () => {
    setHideButton(!hideButton);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {hideButton ? (
        <SidebarContent sidebar_type={sidebar_type} onclick={hideSidebar} />
      ) : (
        <div className="navbar navbar-dark bg-dark">
          <button
            type="button"
            className="navbar-toggler btn-secondarySide"
            onClick={hideSidebar}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
