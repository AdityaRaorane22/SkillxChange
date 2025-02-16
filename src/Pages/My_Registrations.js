import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Pages/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Foooter'; // Ensure the correct import
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './My_Registrations.css';

const localizer = momentLocalizer(moment);

const My_Registrations = () => {
  const { userEmail } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/my-registrations?email=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registrations');
        }
        const data = await response.json();

        // Transform registrations to calendar events format
        const calendarEvents = data.registrations.map((registration) => ({
          id: registration._id,
          title: registration.skillName,
          start: new Date(registration.date), // Make sure this is a Date object
          end: new Date(new Date(registration.date).setHours(new Date(registration.date).getHours() + 1)), // Default 1 hour duration
          allDay: false,
          description: registration.description,
          credits: registration.credits,
          mode: registration.mode,
          address: registration.address,
        }));

        setEvents(calendarEvents);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRegistrations();
  }, [userEmail]);

  return (
    <div className="my-registrations-container">
      <Navbar email={userEmail} />
      <div className="body">
        <h1>My Registrations</h1>
        {error && <p className="error-message">{error}</p>}
        {events.length === 0 && !error && <p>No registrations found.</p>}
        <div style={{ height: '600px', margin: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={(event) => ({
              onClick: () => alert(`Details: ${event.description}\nCredits: ${event.credits}\nMode: ${event.mode}\nAddress: ${event.address}`),
            })}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default My_Registrations;
