import React from 'react';
import './Resources.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Foooter';

const Resources = () => {
  const skillResources = [
    {
      skill: 'Web Development',
      resources: [
        { name: 'MDN Web Docs', link: 'https://developer.mozilla.org/en-US/' },
        { name: 'FreeCodeCamp', link: 'https://www.freecodecamp.org/' },
        { name: 'W3Schools', link: 'https://www.w3schools.com/' },
      ]
    },
    {
      skill: 'Graphic Design',
      resources: [
        { name: 'Canva', link: 'https://www.canva.com/' },
        { name: 'Adobe Color', link: 'https://color.adobe.com/' },
        { name: 'Behance', link: 'https://www.behance.net/' },
      ]
    },
    {
      skill: 'Data Science',
      resources: [
        { name: 'Kaggle', link: 'https://www.kaggle.com/' },
        { name: 'DataCamp', link: 'https://www.datacamp.com/' },
        { name: 'Towards Data Science', link: 'https://towardsdatascience.com/' },
      ]
    },
    {
      skill: 'Digital Marketing',
      resources: [
        { name: 'Google Digital Garage', link: 'https://learndigital.withgoogle.com/digitalgarage/' },
        { name: 'HubSpot Academy', link: 'https://academy.hubspot.com/' },
        { name: 'Moz', link: 'https://moz.com/learn/seo' },
      ]
    },
    // Add more skills and resources as needed
  ];

return (
    <div className="resources-page">
      <Navbar />
      <div className="resources-container">
        <h1>Learning Resources</h1>
        <p>Explore these valuable resources to enhance your skills:</p>
        <div className="resources-grid">
          {skillResources.map((skillResource, index) => (
            <div key={index} className="resource-card">
              <h2>{skillResource.skill}</h2>
              <ul>
                {skillResource.resources.map((resource, resourceIndex) => (
                  <li key={resourceIndex}>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Resources;
