import React from "react";
import "./Contact.css"; 

const initialState = {
  name: "",
  email: "",
  message: "",
};

const Contact = (props) => {
  return (
    <div>
      <div id="contact">
        <div className="custom-container">
          <div className="custom-form-section">
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>
                Please fill out the form below to send us an email and we will
                get back to you as soon as possible.
              </p>
            </div>
            <form name="sentMessage" validate>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="custom-input"
                    placeholder="Name"
                    required
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="custom-input"
                    placeholder="Email"
                    required
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  className="custom-textarea"
                  rows="4"
                  placeholder="Message"
                  required
                ></textarea>
                <p className="help-block text-danger"></p>
              </div>
              <div id="success"></div>
              <button type="submit" className="custom-btn">
                Send Message
              </button>
            </form>
          </div>
          <div className="custom-contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address: 
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone: 
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email: 
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="custom-social-section">
            <ul className="social-links">
              <li>
                <a href={props.data ? props.data.facebook : "/"}>
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href={props.data ? props.data.twitter : "/"}>
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href={props.data ? props.data.youtube : "/"}>
                  <i className="fa fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;