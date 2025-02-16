import React, { useState } from "react";
import "./Navigation.css"; // Link to the custom CSS file

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="menu" className="navbar">
      <div className="container">
        {/* Brand Name */}
        <div className="navbar-header">
          <a className="navbar-brand" href="#page-top">
            SKILL<span className="yellowhead">x</span>CHANGE
          </a>
        </div>

        {/* Toggle Button for Mobile */}
        <button onClick={toggleMenu} className="navbar-toggle">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <ul className="nav">
            <li>
              <a href="#features" className="nav-link">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link">
                Services
              </a>
            </li>
            
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
