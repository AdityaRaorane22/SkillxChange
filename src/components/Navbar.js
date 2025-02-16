import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ email }) => {  
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/user-dashboard');
  };

  return (
    <nav className="navbar1">
      <div className="navbar-header">
        <Link to="/user-dashboard" className="navbar-brand" onClick={handleLogoClick}>
          SKILL<span className="yellowhead">x</span>CHANGE
        </Link>
      </div>

      <div className="nav-links1">
        <Link to="/offer-skill">Offer a Skill</Link>
        <Link to="/community-events">Community Events</Link>
        {/* <Link to={`/my-profile?email=${email}`}>My Profile</Link> */}
        <Link to={`/my-profile?email=${encodeURIComponent(email)}`}>My Profile</Link>

        <Link to={`/my-registrations?email=${email}`}>My Registrations</Link>
        <Link to="/resources">Resources</Link>
        <Link to="http://localhost:3001/react-rtc-demo" target='_blank'>Join a meet</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
