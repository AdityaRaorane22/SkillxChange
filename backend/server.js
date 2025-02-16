const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const User = require('./models/User');
const OfferSkill = require('./models/OfferSkill');
const CommunityEvent = require('./models/CommunityEvent');
const Registration = require('./models/Registration'); 
const RegisterEvent = require('./models/RegisterEvent');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const bcrypt = require('bcrypt');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://2022adityaraorane:2022adityaraorane@cluster0.ktqjk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.post('/api/offer-skills', async (req, res) => {
  const {
    email, skill, date, time, description, mode,
    address, meetingId, password, credits,
  } = req.body;

  try {
    // Save offered skill to the database
    const offerSkill = new OfferSkill({
      email,
      skill,
      date,
      time,
      description,
      mode,
      address,
      meetingId,
      password,
      credits,
    });

    await offerSkill.save();

    // Send an email notification to the user
    const mailOptions = {
      from: 'your-email@gmail.com',  // Replace with your email
      to: email,  // Send the email to the user's email
      subject: 'Skill Offered Confirmation',
      text: `Hello,
      
      You have successfully offered the skill "${skill}" on ${date} at ${time}.
      
      Skill Description: ${description}
      Mode: ${mode}
      ${mode === 'offline' ? `Address: ${address}` : `Meeting ID: ${meetingId}, Password: ${password}`}
      
      You have earned ${credits} credits for this skill offer.

      Thank you for using our platform!

      Best regards,
      SkillXchange Team`
    };

    // Send email using nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send confirmation email', error });
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Send response to client
    res.status(201).json({ message: 'Skill offered successfully and confirmation email sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to offer skill', error: error.message });
  }
});


app.post('/api/users', async (req, res) => {
    const {
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
      skills,
    } = req.body;
  
    try {
      // Hash the password before saving
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({
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
        password: hashedPassword, // Store the hashed password
        skills,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  });

app.get('/api/users', async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  });
  

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body; // Password is in plaintext
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error });
    }
  });
  

  app.post('/api/offer-skills', async (req, res) => {
    const {
      email, skill, date, time, description, mode,
      address, meetingId, password, credits,
    } = req.body;
  
    try {
      const offerSkill = new OfferSkill({
        email,
        skill,
        date,
        time,
        description,
        mode,
        address,
        meetingId,
        password,
        credits,  // Make sure to include credits in the saved data
      });
  
      await offerSkill.save();
      res.status(201).json({ message: 'Skill offered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to offer skill', error: error.message });
    }
  });
  

app.get('/api/offer-skills', async (req, res) => {
    try {
      const skills = await OfferSkill.find(); 
      res.status(200).json({ skills });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching skills', error });
    }
  });
  
  app.post('/api/community-events', async (req, res) => {
    try {
      const event = new CommunityEvent(req.body);
      await event.save();
      res.status(201).send(event);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Get all Community Events
  app.get('/api/community-events', async (req, res) => {
    try {
      const events = await CommunityEvent.find({});
      res.status(200).send({ events });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/my-registrations', async (req, res) => {
    const { userEmail, skillId, skillName, meetingId, password, date, time, mode, address, description, credits } = req.body;
  
    try {
      const newRegistration = new Registration({
        userEmail,
        skillId,
        skillName,
        meetingId,
        password,
        date,
        time,
        mode,
        address,
        description,
        credits
      });
  
      await newRegistration.save();
  
      // Send email after successful registration
      await sendRegistrationEmail(userEmail, {
        skillName,
        meetingId,
        password,
        date,
        time,
        mode,
        address,
        description,
        credits
      });
  
      res.status(201).json({ message: 'Registration successful', registration: newRegistration });
    } catch (error) {
      console.error('Error saving registration:', error);
      res.status(500).json({ message: 'Error saving registration', error: error.message });
    }
  });

  // Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
  secure: true,
    auth: {
      user: 'adityaraoranezoom@gmail.com', // Replace with your Gmail email
      pass: 'exzm lwxb wunp knuy'          // Replace with your Gmail password or app password
    }
  });
  
  // Function to send an email after successful registration
  const sendRegistrationEmail = async (userEmail, registrationData) => {
    const mailOptions = {
      from: 'adityaraoranezoom@gmail.com',
      to: userEmail, // The recipient email address
      subject: `New Registration: ${registrationData.skillName}`,
      text: `User ${userEmail} has registered for the skill: ${registrationData.skillName}.
      
      Details:
      Date: ${registrationData.date}
      Time: ${registrationData.time}
      Mode: ${registrationData.mode}
      Address: ${registrationData.address}
      Credits: ${registrationData.credits}
      Description: ${registrationData.description}
      http://localhost:3001
      Meeting ID: ${registrationData.meetingId}
      Password: ${registrationData.password}`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to 2022.aditya.raprane@ves.ac.in regarding registration for ${registrationData.skillName}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

app.get('/api/my-registrations', async (req, res) => {
  const { email } = req.query; // Get email from query params

  try {
    const registrations = await Registration.find({ userEmail: email }); // Fetch registrations based on user email
    res.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations', error: error.message });
  }
});

app.post('/api/participate', async (req, res) => {
    const { userEmail, eventName, eventDescription, eventDate, eventTime, eventMode, eventLocation, meetingId } = req.body;
  
    // Construct the email body
    const mailOptions = {
      from: 'adityaraoranezoom@gmail.com',
      to: userEmail,
      subject: `Participation Confirmation: ${eventName}`,
      text: `
        Thank you for participating in ${eventName}.
        
        Event Details:
        Name: ${eventName}
        Description: ${eventDescription}
        Date: ${new Date(eventDate).toLocaleDateString()}
        Time: ${eventTime}
        Mode: ${eventMode}
        ${eventMode === 'offline' ? `Location: ${eventLocation}` : `Meeting ID: ${meetingId}`}
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Participation email sent to ${userEmail} for event ${eventName}`);
      res.status(200).json({ message: 'Participation email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending participation email', error: error.message });
    }
  });

  
  app.post('/api/send-email', async (req, res) => {
    const { email, eventName, description, date, time, mode, location, meetingId, password } = req.body;
  
    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: 'adityaraoranezoom@gmail.com',
        pass: 'exzm lwxb wunp knuy',
      },
    });
  
    const mailOptions = {
      from: 'adityaraoranezoom@gmail.com',
      to: email,
      subject: `Event Created: ${eventName}`,
      text: `
        You have created a new community event!
  
        Event Name: ${eventName}
        Description: ${description}
        Date: ${date}
        Time: ${time}
        Mode: ${mode}
        Location: ${location || 'N/A'}
        Meeting ID: ${meetingId || 'N/A'}
        Password: ${password || 'N/A'}
  
        Thank you!
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to send email');
    }
  });

  app.post('/api/participateevent', async (req, res) => {
    const { userEmail, eventName, eventDescription, eventDate, eventTime, eventMode, eventLocation, meetingId } = req.body;
  
    try {
      const registerEvent = new RegisterEvent({
        userEmail,
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        eventMode,
        eventLocation,
        meetingId,
      });
  
      await registerEvent.save();
      res.status(200).json({ message: 'Participation confirmed' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register participation' });
    }
  });

  // Add this route to fetch registered events for a specific user
  app.get('/api/myeventregistrations', async (req, res) => {
    const { email } = req.query; // Get email from query params
  
    try {
      const registrations = await Registration.find({ userEmail: email }); // Fetch registrations based on user email
      res.json({ registrations });
    } catch (error) {
      console.error('Error fetching registrations:', error);
      res.status(500).json({ message: 'Error fetching registrations', error: error.message });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
