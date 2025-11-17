const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// In-memory storage (replace with database in production)
const bookings = [];

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, phone, date, time, service, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !date || !time || !service) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields' 
            });
        }

        // Create booking object
        const booking = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            date,
            time,
            service,
            message: message || '',
            createdAt: new Date().toISOString()
        };

        bookings.push(booking);

        // Send confirmation email to client
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Booking Confirmation - RYQbyreham',
            html: `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #0abab5 0%, #81e6e3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">RYQbyreham</h1>
                        <p style="color: white; margin: 10px 0 0 0;">Fashion Styling Consultation</p>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h2 style="color: #2c2c2c; margin-top: 0;">Booking Confirmed! ✨</h2>
                        <p style="color: #6b6b6b; line-height: 1.6;">Dear ${name},</p>
                        <p style="color: #6b6b6b; line-height: 1.6;">Thank you for booking a styling session with us. We're excited to help you elevate your style!</p>
                        
                        <div style="background: #faf9f7; padding: 20px; border-left: 4px solid #0abab5; margin: 20px 0;">
                            <h3 style="color: #2c2c2c; margin-top: 0;">Booking Details:</h3>
                            <p style="margin: 8px 0;"><strong>Service:</strong> ${service}</p>
                            <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p style="margin: 8px 0;"><strong>Time:</strong> ${time}</p>
                            <p style="margin: 8px 0;"><strong>Contact:</strong> ${phone}</p>
                            ${message ? `<p style="margin: 8px 0;"><strong>Your Message:</strong> ${message}</p>` : ''}
                        </div>

                        <p style="color: #6b6b6b; line-height: 1.6;">We will contact you shortly via WhatsApp to confirm the final details.</p>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="https://api.whatsapp.com/send?phone=${process.env.WHATSAPP_NUMBER}" 
                               style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #0abab5 0%, #81e6e3 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">
                                Contact Us on WhatsApp
                            </a>
                        </div>

                        <p style="color: #6b6b6b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                            If you need to reschedule or have any questions, please contact us at ${process.env.EMAIL_USER}
                        </p>
                    </div>
                </div>
            `
        };

        // Send notification email to business owner
        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Booking - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #0abab5;">New Booking Received! 🎉</h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-top: 20px;">
                        <h3>Client Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Service:</strong> ${service}</p>
                        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Time:</strong> ${time}</p>
                        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
                        <p><strong>Booking ID:</strong> ${booking.id}</p>
                    </div>
                    <p style="margin-top: 20px;">
                        <a href="https://api.whatsapp.com/send?phone=${phone}" style="display: inline-block; padding: 12px 24px; background: #0abab5; color: white; text-decoration: none; border-radius: 5px;">
                            Contact Client via WhatsApp
                        </a>
                    </p>
                </div>
            `
        };

        // Send emails
        await transporter.sendMail(clientMailOptions);
        await transporter.sendMail(ownerMailOptions);

        res.json({ 
            success: true, 
            message: 'Booking confirmed! Check your email for details.',
            bookingId: booking.id
        });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Something went wrong. Please try again or contact us directly.' 
        });
    }
});

// Get all bookings (admin only - add authentication in production)
app.get('/api/bookings', (req, res) => {
    res.json({ success: true, bookings });
});

app.listen(PORT, () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
    console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
});

