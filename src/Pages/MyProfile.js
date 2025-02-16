import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyProfile.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Foooter';
import profilePhoto from "./profile.png";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const email = searchParams.get('email');

      if (!email) {
        setError('Email not provided');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/users?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [location]);

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!userData) return <div className="loading-message">Loading profile...</div>;

  return (
    <div className="profile-page">
      <Navbar email={userData.email} />
      <div className="profile-container">
        <div className="profile-header">
          <img src={profilePhoto} alt="Profile" className="profile-photo"/>
          <h1>{userData.firstName} {userData.middleName} {userData.lastName}</h1>
          <p className="user-email">{userData.email}</p>
        </div>
        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Mobile Number:</strong> {userData.mobileNumber}</p>
          </div>
          <div className="profile-section">
            <h2>Location</h2>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Pincode:</strong> {userData.pincode}</p>
            <p><strong>Country:</strong> {userData.country}</p>
            <p><strong>State:</strong> {userData.state}</p>
          </div>
          <div className="profile-section">
            <h2>About Me</h2>
            <p>{userData.description}</p>
          </div>
          <div className="profile-section">
            <h2>Skills</h2>
            <ul className="skills-list">
              {userData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MyProfile;
