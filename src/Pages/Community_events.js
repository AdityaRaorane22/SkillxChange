import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./Community_events.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Foooter";

const getRandomColor = () => {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getRandomParticipants = () => {
  return Math.floor(Math.random() * 20) + 5; // Random number between 5 and 24
};


const Community_events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/community-events"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.events);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleParticipate = async (event) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/participateevent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: event.email, // Replace with logged-in user's email
            eventName: event.eventName,
            eventDescription: event.description,
            eventDate: event.date,
            eventTime: event.time,
            eventMode: event.mode,
            eventLocation: event.location,
            meetingId: event.meetingId,
          }),
        }
      );

      if (response.ok) {
        alert("Participation confirmed. Check your email for details.");
      } else {
        throw new Error("Failed to participate");
      }
    } catch (error) {
      console.error("Error while participating:", error);
      alert("Error while participating in the event");
    }
  };

  return (
    <div className="community-events-page">
      <Navbar />
      <div className="community-events-container">
        <h1 className="page-title">Community Events</h1>
        <p className="page-description">
          Join exciting events and connect with the community!
        </p>

        <Link to="/create-event" className="create-event-button">
          <i className="fas fa-plus"></i> Create Community Event
        </Link>

        {loading && <div className="loading">Loading events...</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="event-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              <div
                className="event-header"
                style={{backgroundColor: getRandomColor()}}
              >
                <h2>{event.eventName}</h2>
                <span className="event-date">{formatDate(event.date)}</span>
              </div>
              <div className="event-body">
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <p>
                    <i className="far fa-clock"></i> {event.time}
                  </p>
                  <p>
                    <i className="fas fa-users"></i> {event.mode}
                  </p>
                  {event.mode === "offline" && (
                    <p>
                      <i className="fas fa-map-marker-alt"></i> {event.location}
                    </p>
                  )}
                  {event.mode === "online" && (
                    <p>
                      <i className="fas fa-video"></i> Virtual Event
                    </p>
                  )}
                </div>
              </div>
              <div className="event-footer">
                <button
                  className="participate-button"
                  onClick={() => handleParticipate(event)}
                >
                  Join Project
                </button>
                {/* <span className="participants-count">
                  <i className="fas fa-user-friends"></i>{" "}
                  {getRandomParticipants()} joined
                </span> */}
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && !loading && !error && (
          <div className="no-events">
            <p>No events available at the moment. Why not create one?</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Community_events;
