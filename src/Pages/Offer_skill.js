import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Offer_skill.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Foooter';

const OfferSkill = () => {
  const [email, setEmail] = useState('');
  const [skill, setSkill] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('online');
  const [address, setAddress] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');
  const [credits, setCredits] = useState(0);  // New state for credits
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  // [,,,,5ovw-m1ub-k1ga,1670-x246-4gbk]
  const meetingPairs = [
    { meetingId: '58gr-6edi-zxw3', password: '12345' },
    { meetingId: 'itz6-8i66-kev3', password: '98765' },
    { meetingId: '8pww-yjdl-9gh1', password: '54321' },
    { meetingId: 'm327-kay4-991g', password: '65432' },
  ];


const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJiMmQxMGVjOC03YjM0LTRlM2UtYjhkMy1mYTk0OTUyMjQ5YmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyOTgyOTg0MSwiZXhwIjoxNzMwNDM0NjQxfQ.JxPu3u1Af5XyasCUWEqwIGZv_QvKGbSbQSyZDczWH0o";
// API call to create a meeting
const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  console.log("Room ID from API.js"+roomId);
  return roomId;
};

  const getRandomMeetingDetails = () => {
    const randomIndex = Math.floor(Math.random() * meetingPairs.length);
    return meetingPairs[randomIndex];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedMeetingId = '';
    let selectedPassword = '';
    if (mode === 'online') {
      const randomMeetingDetails = getRandomMeetingDetails();
      selectedMeetingId = await createMeeting({token : authToken});
      selectedPassword = randomMeetingDetails.password;
      setMeetingId(selectedMeetingId);
      setPassword(selectedPassword);
    }

    const offerData = {
      email,
      skill,
      date,
      time,
      description,
      mode,
      address: mode === 'offline' ? address : undefined,
      meetingId: mode === 'online' ? selectedMeetingId : undefined,
      password: mode === 'online' ? selectedPassword : undefined,
      credits,  // Include credits in the offer data
    };

    try {
      const response = await fetch('http://localhost:5000/api/offer-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) {
        throw new Error('Failed to offer skill');
      }

      const data = await response.json();
      setSuccess(data.message);
      setError(null);

      setEmail('');
      setSkill('');
      setDate('');
      setTime('');
      setDescription('');
      setMode('online');
      setAddress('');
      setMeetingId('');
      setPassword('');
      setCredits(0);

      navigate('/user-dashboard');
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <>
    <Navbar/>
    <div>
    <video autoPlay muted loop className="background-video2">
          <source
            src="https://videos.pexels.com/video-files/8612325/8612325-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
    </div>

    <div className="offer-skill-container">
      <h2>Offer a Skill</h2>
      <form onSubmit={handleSubmit}>
        <label className='offer-label'>
          Email:</label>
          <input
            className="offer-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        
        <label className='offer-label'>
          Skill:</label>
          <input
          className="offer-input"
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            required
          />
        
        <label className='offer-label'>
          Date:</label>
          <input
          className="offer-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        
        <label className='offer-label'>
          Time:</label>
          <input
          className="offer-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        
        <label className='offer-label'>
          Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        
        <label className='offer-label'>
          Mode:</label>
          <select className="offer-select" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        
        {mode === 'offline' && (
          <>
          <label className='offer-label'>
            Address:
          </label>
            <input
            className="offer-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
            </>
        )}
        <label className='offer-label'>
          Credits:
        </label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
            min="0"
          />
        
        <button type="submit">Submit</button>
      </form>

      {mode === 'online' && meetingId && password && (
        <div className="meeting-details">
          <h3>Meeting Details</h3>
          <p><strong>Meeting ID:</strong> {meetingId}</p>
          <p><strong>Password:</strong> {password}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
    <Footer/>
    </>
  );
};

export default OfferSkill;
