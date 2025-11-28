import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from "../components/DarkModeToggle";



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">IP Address Management system</Link>
        <div>
          <Link className="nav-link d-inline text-white me-3" to="/">Dashboard</Link>
          <Link className="nav-link d-inline text-white me-3" to="/charts">Charts</Link>
          <Link className="nav-link d-inline text-white" to="/add">Add IP</Link>
        </div>
          {/* <li className="nav-item"><DarkModeToggle /></li> */}
      </div>
    </nav>
  );
};

export default Navbar;
