import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import CreateProfile from './Pages/Create_profile';
import UserDashboard from './Pages/User_dashboard';
import OfferSkill from './Pages/Offer_skill';
import CommunityEvents from './Pages/Community_events';
import Resources from './Pages/Resources';
import MyRegistrations from './Pages/My_Registrations';
import { UserProvider } from './Pages/UserContext';
import MyProfile from './Pages/MyProfile';
import './App.css';
import CreateEvent from './Pages/CreateEvent';

function App() {
  return (
    <UserProvider>
    <Router>
      <div>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
</style>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-profile" element={<CreateProfile />}/>
          {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          <Route path="/user-dashboard" element={<UserDashboard />} />


          <Route path="/offer-skill" element={<OfferSkill />} />
         <Route path="/community-events" element={<CommunityEvents />} />
         <Route path="/my-profile" element={<MyProfile />} />
         <Route path="/my-registrations" element={<MyRegistrations />} />
         <Route path="/create-event" element={<CreateEvent />} />  
         <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
