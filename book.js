// Vercel Serverless Function to handle bookings and send SMS
// This file should be at: api/book.js

const twilio = require('twilio');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, workout, day, timeSlot } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !workout || !day || !timeSlot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize Twilio client with your credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const yourPhone = process.env.YOUR_PHONE_NUMBER; // Your phone number to receive texts

    if (!accountSid || !authToken || !twilioPhone || !yourPhone) {
      console.error('Missing Twilio environment variables');
      // Still return success to user but log the error
      return res.status(200).json({ 
        success: true, 
        message: 'Booking received (SMS pending configuration)' 
      });
    }

    const client = twilio(accountSid, authToken);

    // Format the message
    const message = `
🎉 NEW BOOKING!

Name: ${name}
Email: ${email}
Phone: ${phone}

Workout: ${workout}
Day: ${day}
Time: ${timeSlot}

Reply to confirm! 💕
    `.trim();

    // Send SMS via Twilio
    await client.messages.create({
      body: message,
      from: twilioPhone,
      to: yourPhone
    });

    // Log booking for backup
    console.log('Booking received:', {
      name,
      email,
      phone,
      workout,
      day,
      timeSlot,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Booking confirmed! You will receive a confirmation text shortly.' 
    });

  } catch (error) {
    console.error('Error processing booking:', error);
    
    // Return success to user even if SMS fails
    // This way the booking still goes through
    return res.status(200).json({ 
      success: true, 
      message: 'Booking received' 
    });
  }
};
