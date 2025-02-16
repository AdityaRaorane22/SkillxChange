import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css'
import Navbar from '../components/Navbar';
const CreateEvent = () => {
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('online'); // default mode
  const [location, setLocation] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const generateMeetingDetails = () => {
    const id = Math.random().toString(36).substring(2, 15);
    const pass = Math.random().toString(36).substring(2, 8);
    setMeetingId(id);
    setPassword(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      email,
      eventName,
      description,
      date,
      time,
      mode,
      location,
      meetingId: mode === 'online' ? meetingId : null,
      password: mode === 'online' ? password : null,
    };

    try {
      const response = await fetch('http://localhost:5000/api/community-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      
      navigate('/community-events'); // Use navigate for redirection
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="create-event-container">
      <h2>Create Community Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <label className="event-label">
          Email ID:
          <input type="email" className="event-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="event-label">
          Name of Event:
          <input type="text" className="event-input" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
        </label>
        <label className="event-label">
          Description:
          <textarea value={description} className="event-textarea" onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label className="event-label">
          Date:
          <input type="date" value={date} className="event-input" onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label className="event-label">
          Time:
          <input type="time" value={time} className="event-input" onChange={(e) => setTime(e.target.value)} required />
        </label>
        <label className="event-label">
          Mode:
          <select value={mode} className="event-select" onChange={(e) => setMode(e.target.value)}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        {mode === 'offline' && (
          <label className="event-label">
            Location:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </label>
        )}
        {mode === 'online' && (
          <div>
            <button type="button" onClick={generateMeetingDetails}>Generate Meeting ID and Password</button>
            <p>Meeting ID: {meetingId}</p>
            <p>Password: {password}</p>
          </div>
        )}
        <button type="submit">Create Event</button>
      </form>
    </div>
    </>
  );
};

export default CreateEvent;
