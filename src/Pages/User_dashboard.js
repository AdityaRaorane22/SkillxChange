import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Pages/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Foooter";
import "./User_dashboard.css";

const handleShare = (skill) => {
  if (navigator.share) {
    navigator
      .share({
        title: `Check out this skill: ${skill.skill}`,
        text: `I found this amazing skill on SkillxChange: ${skill.skill}. Join me in learning!`,
        url: window.location.href,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  } else {
    alert("Web Share API is not supported in your browser");
  }
};

const UserDashboard = () => {
  const {userEmail} = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(1000);
  const [skillFilter, setSkillFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [creditFilter, setCreditFilter] = useState("");
  const [creditValue, setCreditValue] = useState(0);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/offer-skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(data.skills);
        setFilteredSkills(data.skills);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    filterSkills();
  }, [skillFilter, modeFilter, creditFilter, creditValue, skills]);

  const filterSkills = () => {
    let filtered = skills;

    if (skillFilter) {
      filtered = filtered.filter((skill) => skill.skill === skillFilter);
    }
    if (modeFilter) {
      filtered = filtered.filter((skill) => skill.mode === modeFilter);
    }
    if (creditFilter && creditValue) {
      if (creditFilter === "greater") {
        filtered = filtered.filter((skill) => skill.credits >= creditValue);
      } else if (creditFilter === "less") {
        filtered = filtered.filter((skill) => skill.credits <= creditValue);
      }
    }

    setFilteredSkills(filtered);
  };

  const handleSkillFilterChange = (e) => {
    setSkillFilter(e.target.value);
  };

  const handleModeFilterChange = (e) => {
    setModeFilter(e.target.value);
  };

  const handleCreditFilterChange = (e) => {
    setCreditFilter(e.target.value);
  };

  const handleCreditValueChange = (e) => {
    setCreditValue(Number(e.target.value));
  };

  const handleJoin = async (skill) => {
    if (credits < skill.credits) {
      alert("Insufficient credits to join this skill.");
      return;
    }

    const registrationData = {
      userEmail,
      skillId: skill._id,
      skillName: skill.skill,
      meetingId: skill.meetingId,
      password: skill.password,
      date: skill.date,
      time: skill.time,
      mode: skill.mode,
      address: skill.address,
      description: skill.description,
      credits: skill.credits,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/my-registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register for skill");
      }

      setSkills((prev) => prev.filter((s) => s._id !== skill._id));
      const updatedCredits = credits - skill.credits;
      setCredits(updatedCredits);
      alert(
        `You have joined ${skill.skill}. Remaining credits: ${updatedCredits}`
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar email={userEmail} />
      <div id="header1" className="header-section1">
        <div className="intro1">
          <video autoPlay muted loop className="background-video1">
            <source
              src="https://videos.pexels.com/video-files/5200349/5200349-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="overlay1">
            <div className="intro-content1">
              <h1>Discover, Share and Grow Your Skills!</h1>
              <div className="navbar-header">
                <a className="navbar-brand">
                  Welcome to SKILL<span className="yellowhead">x</span>CHANGE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-container1">
        <div className="intro-content2">
          <h1>Join Courses</h1>
        </div>
        <div className="body1">
          {userEmail && <h2>User: {userEmail}</h2>}
          <div className="user-info-section">
            <div className="user-greeting">
              <h2>Welcome, {userEmail}</h2>
            </div>
            <div className="credits-display">
              <div className="credits-icon">
                <i className="fas fa-coins"></i>
              </div>
              <div className="credits-details">
                <span className="credits-amount">{credits}</span>
                <span className="credits-label">Credits Available</span>
              </div>
              <div className="credits-info">
                <span
                  className="tooltip"
                  data-tooltip="Credits are used to join skills. Earn more by offering your own skills!"
                >
                  ⓘ
                </span>
              </div>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="skill-filter-container">
            <select
              className="skill-filter1"
              value={skillFilter}
              onChange={handleSkillFilterChange}
            >
              <option value="">All Skills</option>
              {[...new Set(skills.map((skill) => skill.skill))].map(
                (uniqueSkill, index) => (
                  <option key={index} value={uniqueSkill}>
                    {uniqueSkill}
                  </option>
                )
              )}
            </select>

            <select
              className="skill-filter1"
              value={modeFilter}
              onChange={handleModeFilterChange}
            >
              <option value="">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            <select
              className="skill-filter1"
              value={creditFilter}
              onChange={handleCreditFilterChange}
            >
              <option value="">Filter by Credits</option>
              <option value="greater">Credits Greater Than</option>
              <option value="less">Credits Less Than</option>
            </select>

            <input
              className="credit-input"
              type="number"
              placeholder="Enter credit value"
              value={creditValue}
              onChange={handleCreditValueChange}
            />
          </div>

          <div className="skills-list1">
            {filteredSkills.length === 0 && !error && (
              <p>No skills available.</p>
            )}
            {filteredSkills.map((skill) => (
              <div className="skill-card1" key={skill._id}>
                <div className="skill-header">
                  <h3>{skill.skill}</h3>
                  <span className="skill-credits">{skill.credits} Credits</span>
                </div>
                <div className="skill-body">
                  <p>
                    <i className="far fa-calendar"></i>{" "}
                    {new Date(skill.date).toLocaleDateString()}
                  </p>
                  <p>
                    <i className="far fa-clock"></i> {skill.time}
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {skill.mode}
                  </p>
                  {skill.mode === "offline" && (
                    <p>
                      <i className="fas fa-location-arrow"></i> {skill.address}
                    </p>
                  )}
                </div>
                <p className="skill-description">{skill.description}</p>
                <div className="skill-actions">
                  <button
                    className="join-button1"
                    onClick={() => handleJoin(skill)}
                  >
                    Join
                  </button>
                  <button
                    className="share-button"
                    onClick={() => handleShare(skill)}
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
