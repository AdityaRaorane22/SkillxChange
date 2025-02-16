import React from 'react'
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import Navigation from "../components/LandingPageComponents/navigation"
import Header from "../components/LandingPageComponents/header"
import Features from "../components/LandingPageComponents/features"
import About from "../components/LandingPageComponents/about"
import Services from "../components/LandingPageComponents/services"
import Footer from "../components/LandingPageComponents/Footer"
import Contact from "../components/LandingPageComponents/contact"
import { useState, useEffect } from 'react';
import "../App.css";

const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });

function LandingPage() {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);

  return (
    <div>
      
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Contact data={landingPageData.Contact} />
      <Footer />
    </div>
  )
}

export default LandingPage