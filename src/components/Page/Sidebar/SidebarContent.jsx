import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CountryLinkContext } from "../../../stores/StoreProvider";

const SidebarContent = ({ sidebar_type, onclick }) => {
  const [sidebarItemList, setSidebarItemList] = useState([]);
  const countryLink = useContext(CountryLinkContext);

  useEffect(() => {
    getSidebarItemList();
  }, [countryLink]);

  const getSidebarItemList = () => {
    if (sidebar_type == "tables" || sidebar_type == "access") {
      setSidebarItemList(countryLink);
    } else if ((sidebar_type = "rankings")) {
      setSidebarItemList([
        {
          name: "Club ranking",
          code: "club",
        },
        {
          name: "Country ranking",
          code: "country",
        },
      ]);
    }
  };

  const countryListHTML = sidebarItemList.map((item) => {
    if (item.code === "") {
      return "";
    } else {
      return (
        <li className="nav-item">
          <NavLink
            exact
            to={`/${sidebar_type}/${item.code}`}
            className="nav-link text-white"
            end
          >
            {item.name}
          </NavLink>
        </li>
      );
    }
  });

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebarLeft">
      <span className="hideSidebarInfo">
        Click on hamburger to hide sidebar
      </span>
      <nav className="navbar navbar-dark bg-dark">
        <button
          type="button"
          className="navbar-toggler btn-secondarySide"
          onClick={onclick}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">{countryListHTML}</ul>
      <hr />
    </div>
  );
};

export default SidebarContent;
