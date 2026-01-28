# 📱 SMS Booking Notifications Setup Guide

This guide will help you set up text message notifications when someone books a class!

---

## 🎯 What Happens When Someone Books:

1. ✅ User fills out booking form with name, email, and phone
2. ✅ Time slot is removed from the calendar (no double bookings!)
3. ✅ YOU get a text message with their info:
   ```
   🎉 NEW BOOKING!
   
   Name: Sarah Johnson
   Email: sarah@email.com
   Phone: (555) 123-4567
   
   Workout: Mat Pilates
   Day: Monday
   Time: 2:00 PM - 3:00 PM
   
   Reply to confirm! 💕
   ```
4. ✅ User sees confirmation message
5. ✅ You text them to confirm!

---

## 🚀 Setup Instructions (15 minutes)

### Step 1: Create Twilio Account (Free Trial)

1. Go to [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for FREE trial account
3. Verify your phone number (this is where you'll receive booking texts)
4. You get **$15 free credit** - enough for ~500 text messages!

### Step 2: Get Your Twilio Credentials

After signing up, you'll see a dashboard. Get these 3 things:

1. **Account SID** - looks like: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
2. **Auth Token** - looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. **Twilio Phone Number** - You'll be given a free phone number like: `+15551234567`

**📝 Note:** Click "Get a Trial Number" if you don't see one yet.

### Step 3: Add Environment Variables to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these 4 variables one by one:

   | Name | Value | Example |
   |------|-------|---------|
   | `TWILIO_ACCOUNT_SID` | Your Account SID | `AC1234567890abcdef...` |
   | `TWILIO_AUTH_TOKEN` | Your Auth Token | `abcdef1234567890...` |
   | `TWILIO_PHONE_NUMBER` | Your Twilio number | `+15551234567` |
   | `YOUR_PHONE_NUMBER` | YOUR real phone | `+15083788888` |

   **Important:** Phone numbers MUST include country code (+1 for US)

5. Click **Save** for each one

### Step 4: Redeploy Your Site

1. In Vercel, go to **Deployments** tab
2. Click the **three dots** on the latest deployment
3. Click **Redeploy**
4. Wait ~1 minute for deployment to complete

### Step 5: Test It!

1. Visit your live website
2. Try booking a class
3. Fill out the form
4. You should receive a text message! 📱

---

## 💰 Pricing After Free Trial

Twilio costs after your $15 credit runs out:
- **$1/month** for your phone number
- **$0.0075 per text message** sent (less than 1 cent!)

So 100 bookings = ~$1.75/month total

---

## 🔧 Troubleshooting

### Not receiving texts?

**Check these:**
- ✅ Are all 4 environment variables in Vercel?
- ✅ Did you redeploy after adding variables?
- ✅ Phone numbers include `+1` country code?
- ✅ Is your Twilio trial account active?
- ✅ Is the number you're texting to verified in Twilio trial?

**Twilio Trial Limitation:** During trial, you can only send texts to phone numbers you've verified in Twilio. To verify more numbers:
1. Go to Twilio Console
2. Phone Numbers → Verified Caller IDs
3. Add the number you want to text

**To send to ANY number:** Upgrade your Twilio account (just add $20 credit, no monthly fee)

### Booking goes through but no text?

The booking will still work even if Twilio isn't set up. Users will see "Booking confirmed!" but you won't get the text until Twilio is configured.

### "Environment variables missing" error?

1. Double-check variable names are EXACTLY:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
   - `YOUR_PHONE_NUMBER`
2. Make sure you redeployed after adding them
3. No extra spaces in the values

---

## 📊 How Time Slots Work

### Removing Booked Slots:
- When someone books, that time slot is **removed from the calendar**
- Other people won't see it anymore
- It's stored in the browser's localStorage

### ⚠️ Important Note:
Currently, booked slots are only saved in each visitor's browser. This means:
- ✅ The person who booked won't see it again
- ❌ Someone on a different device might still see it

### To Fix This (Optional Advanced Setup):
You'd need a database to track bookings across all users. Options:
- **Airtable** (easiest - free spreadsheet database)
- **Supabase** (free PostgreSQL database)
- **Firebase** (Google's database)

Let me know if you want help setting up a database!

---

## 🎨 Customizing the Text Message

Want to change what the text says? Edit `api/book.js`:

```javascript
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
```

Change any text you want!

---

## 📋 Quick Reference

**Your Twilio Dashboard:** [console.twilio.com](https://console.twilio.com)

**Your Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)

**Need Help?** 
- Twilio Support: [support.twilio.com](https://support.twilio.com)
- Twilio Docs: [twilio.com/docs](https://www.twilio.com/docs)

---

## ✅ Setup Checklist

- [ ] Created Twilio account
- [ ] Got trial phone number
- [ ] Copied Account SID
- [ ] Copied Auth Token
- [ ] Added all 4 environment variables to Vercel
- [ ] Redeployed website
- [ ] Tested booking and received text
- [ ] Verified your phone number works

---

You're all set! Every booking will now send you a text message! 🎉📱
