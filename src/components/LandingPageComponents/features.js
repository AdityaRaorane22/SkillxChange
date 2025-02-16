import React from "react";
import "./Features.css";  // Link to the custom CSS file

const Features = (props) => {
  return (
    <div id="features" className="features-section">
      <div className="custom-container">
        <div className="section-title-wrapper">
          <h2>Features</h2>
        </div>
        <div className="features-grid">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="feature-item">
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
export default Features;