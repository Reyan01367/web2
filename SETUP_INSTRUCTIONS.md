# 🎨 RYQbyreham Setup Instructions

## 📧 IMPORTANT: Email Configuration Required

Before the booking system can send notifications, you need to set up your email password:

### Step 1: Get Hotmail/Outlook App Password

1. Go to https://account.microsoft.com/security
2. Sign in with r.and.r@hotmail.com
3. Click on **"Advanced security options"**
4. Scroll to **"App passwords"**
5. Click **"Create a new app password"**
6. Copy the generated password (it will look like: xxxx-xxxx-xxxx-xxxx)

### Step 2: Add Password to .env File

1. Open the file `.env` in the web2 folder
2. Replace `your_password_here_change_this` with your app password
3. Save the file

Example:
```
EMAIL_PASS=abcd-efgh-ijkl-mnop
```

## 🚀 Starting the Server

Once email is configured, run:

```bash
npm start
```

The website will be available at: **http://localhost:3000**

## ✅ Testing the Booking System

1. Open http://localhost:3000 in your browser
2. Click "Book Your Session"
3. Fill out the form with test data
4. Submit the booking
5. Check your email (r.and.r@hotmail.com) for both:
   - Client confirmation email
   - Business notification email

## 🌐 Deploying Online

### Quick Deploy Options:

**Option 1: Netlify (Free)**
- Best for: Easy setup, free hosting
- Steps:
  1. Create account at netlify.com
  2. Drag and drop your web2 folder
  3. Add environment variables in Netlify settings
  4. Your site will be live!

**Option 2: Heroku (Free)**
- Best for: Full backend support
- Steps:
  1. Create account at heroku.com
  2. Install Heroku CLI
  3. Run: `heroku create your-app-name`
  4. Run: `git push heroku main`

**Option 3: Vercel (Free)**
- Best for: Fast deployment
- Steps:
  1. Create account at vercel.com
  2. Install Vercel CLI: `npm i -g vercel`
  3. Run: `vercel`
  4. Follow prompts

## 📱 WhatsApp Integration

The booking button automatically sends users to:
- WhatsApp number: +966505412256
- They can book directly or ask questions

## 🎨 Customization

### Change Colors
Edit the CSS in `index.html` (around line 20):
```css
:root {
    --tiffany-blue: #0abab5;  /* Change this */
    --tiffany-light: #81e6e3; /* And this */
}
```

### Change Business Hours
Edit time slots in `index.html` (around line 720):
```html
<option value="09:00 AM">09:00 AM</option>
<!-- Add or remove times here -->
```

### Change Services
Edit services in `index.html` (around line 700):
```html
<option value="Your Service">✨ Your Service Name</option>
```

## 🆘 Troubleshooting

**Email not sending?**
- Check your .env file has correct password
- Make sure you're using an App Password, not regular password
- Check spam folder

**Booking form not working?**
- Make sure server is running (`npm start`)
- Check browser console for errors (F12)
- Verify all form fields are filled

**Need help?**
Contact: r.and.r@hotmail.com

---

## 🎯 What's Included

✅ Beautiful responsive website
✅ Calendar date picker
✅ Time slot selection  
✅ Email notifications (client + owner)
✅ WhatsApp integration
✅ Form validation
✅ Professional email templates
✅ Mobile-friendly design
✅ Tiffany blue theme

**Total Cost to Run:** $0/month (if using free tier hosting)
**Setup Time:** 5-10 minutes
**Technical Skills Required:** Basic (just follow steps above)

Enjoy your new booking website! 💙✨

