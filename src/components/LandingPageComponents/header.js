import React from "react";
import "./Header.css";  // Link to the custom CSS file
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  
  return (
    <header id="header" className="header-section">
      <div className="intro">
        <div className="video-wrapper">
          <video autoPlay muted loop className="background-video">
            <source
              src="https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay">
          <div className="intro-content">
            <h1>
              {props.data ? props.data.title : "Loading"}
              <span></span>
            </h1>
            <p>{props.data ? props.data.paragraph : "Loading"}</p>
            <a href="#features" className="custom-btn" onClick={handleLoginClick}>
              Login / SignUp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
