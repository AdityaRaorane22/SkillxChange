import React, { useState } from 'react';
import './Create_profile.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const CreateProfile = () => {
  const [skills, setSkills] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Maharashtra');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const availableSkills = [
    'Dancing', 'Playing Piano', 'Cooking', 'Singing', 'Drawing',
    'Photography', 'Writing', 'Gardening', 'Programming', 'Gaming',
    'Designing', 'Public Speaking', 'Teaching', 'Baking', 'Traveling',
    'Languages', 'Sports', 'Martial Arts', 'Crafting', 'Painting',
    'Coding', 'Video Editing', 'Acting', 'Research', 'Social Media',
    'Networking', 'Filmmaking', 'Data Analysis', 'Web Development', 'Fashion',
    'Fitness', 'Yoga', 'Knitting', 'Sculpting', 'Animation',
    'Blogging', 'Carpentry', 'Floristry', 'Event Planning', 'Interior Design',
    'Translating', 'Customer Service', 'Sales', 'SEO', 'App Development'
  ];

  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      mobileNumber,
      address,
      pincode,
      country,
      state,
      description,
      email,
      password,
      skills
    };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        alert(`Error: ${errorData.message}`); // Provide feedback to the user
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="title">Create a Profile</h1>
        
        <label>First Name</label>
        <input type="text" className="signup-input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        
        <label>Middle Name</label>
        <input type="text" className="signup-input-field" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        
        <label>Last Name</label>
        <input type="text" className="signup-input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        
        <label>Date of Birth</label>
        <input type="date" className="signup-input-field" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        
        <label>Mobile Number</label>
        <input type="text" placeholder="** **** ****" className="signup-input-field" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        
        <label>Address</label>
        <input type="text" className="signup-input-field" value={address} onChange={(e) => setAddress(e.target.value)} required />
        
        <label>Pincode</label>
        <input type="text" className="signup-input-field" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
        
        <label>Country</label>
        <select className="signup-input-field" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="France">France</option>
          <option value="Australia">Australia</option>
        </select>
        
        <label>State</label>
        <select className="signup-input-field" value={state} onChange={(e) => setState(e.target.value)}>
          <option value="Maharashtra">Maharashtra</option>
          <option value="California">California</option>
          <option value="New South Wales">New South Wales</option>
          <option value="Île-de-France">Île-de-France</option>
          {/* Add more states as needed */}
        </select>
        
        <label>Description</label>
        <textarea className="signup-input-field" value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <label>Email ID</label>
        <input type="email" className="signup-input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Password</label>
        <input type="password" className="signup-input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Skills</label>
        <div className="skills-container">
          {availableSkills.map(skill => (
            <div
              key={skill}
              className={`skill-tag ${skills.includes(skill) ? 'selected' : ''}`}
              onClick={() => handleSkillSelect(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="selected-skills">
          {skills.map(skill => (
            <div key={skill} className="selected-skill">
              {skill}
              <span className="remove-skill" onClick={() => handleSkillRemove(skill)}> ✖</span>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </>
  );
};

export default CreateProfile;
