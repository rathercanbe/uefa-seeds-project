import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="mb-auto">
      <div>
        <h3 className="float-md-start mb-0">UEFA Calculator</h3>
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/rankings" className="nav-link">
            Rankings
          </NavLink>
          <NavLink to="/tables" className="nav-link">
            Tables
          </NavLink>
          <NavLink to="/access" className="nav-link">
            Access List
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
