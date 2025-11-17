# RYQbyreham - Fashion Styling Booking Website

A beautiful, modern booking website for fashion styling consultations with calendar integration and email notifications.

## Features

✨ **Beautiful UI**
- Tiffany blue & neutral color scheme
- Smooth animations and transitions
- Fully responsive design
- Modern gradient effects

📅 **Smart Booking System**
- Interactive calendar date picker
- Time slot selection
- Service selection
- Form validation

📧 **Automatic Notifications**
- Email confirmation to clients
- Booking notification to business owner
- Professional email templates
- WhatsApp integration

## Installation

1. Install Node.js dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Configure your email credentials in `.env`:
```
PORT=3000
EMAIL_USER=r.and.r@hotmail.com
EMAIL_PASS=your_hotmail_password
WHATSAPP_NUMBER=966505412256
```

## Email Setup for Hotmail/Outlook

To enable email notifications:

1. Go to your Hotmail/Outlook account settings
2. Enable "Two-step verification"
3. Generate an "App Password":
   - Go to Security > Advanced security options
   - Under "App passwords", select "Create a new app password"
   - Copy the generated password
   - Use this password in your `.env` file as `EMAIL_PASS`

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The website will be available at `http://localhost:3000`

## Deployment Options

### Option 1: Netlify (Recommended for Static + Functions)
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create `netlify.toml` for serverless functions
3. Deploy: `netlify deploy --prod`

### Option 2: Heroku
1. Install Heroku CLI
2. Create Heroku app: `heroku create`
3. Add environment variables: `heroku config:set EMAIL_USER=xxx EMAIL_PASS=xxx`
4. Deploy: `git push heroku main`

### Option 3: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel --prod`
3. Add environment variables in Vercel dashboard

### Option 4: Traditional Hosting (cPanel, etc.)
1. Upload all files to your hosting
2. Install Node.js on your server
3. Run `npm install` and `npm start`
4. Use PM2 to keep the server running: `pm2 start server.js`

## File Structure

```
web2/
├── index.html          # Main website file
├── logo.png           # Business logo
├── server.js          # Backend API server
├── package.json       # Dependencies
├── .env.example       # Environment variables template
└── README.md          # Documentation
```

## Customization

### Colors
Edit CSS variables in `index.html`:
```css
:root {
    --tiffany-blue: #0abab5;
    --tiffany-light: #81e6e3;
    /* ... more colors */
}
```

### Business Hours
Edit time slots in the HTML `<select id="time">` element

### Disabled Days
Edit the Flatpickr configuration in the JavaScript:
```javascript
disable: [
    function(date) {
        return (date.getDay() === 5); // Disable Fridays
    }
]
```

## Support

For any issues or questions:
- Email: r.and.r@hotmail.com
- WhatsApp: +966505412256

## License

© 2025 RYQbyreham. All rights reserved.

