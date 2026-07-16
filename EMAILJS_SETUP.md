# EmailJS Setup Guide

Your portfolio now includes a contact form that can send emails to yassirbensmina73@gmail.com using EmailJS. Follow these steps to configure it:

## Step 1: Create an EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. After logging in, go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose a service (Gmail is recommended for personal use)
4. Follow the instructions to connect your email account
5. Copy the **Service ID** (e.g., "service_xxxxxxxxx")

## Step 3: Create an Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Configure the template with these settings:

**Template Name:** `contact_form` (or any name you prefer)

**To Email:** `yassirbensmina73@gmail.com`

**Subject:** `{{subject}}`

**Content:**
```
You have received a new message from {{from_name}} ({{from_email}})

Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Save the template
5. Copy the **Template ID** (e.g., "template_xxxxxxxxx")

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in the dashboard
2. Copy your **Public Key**

## Step 5: Update Your JavaScript File

Open `script/script.js` and replace the placeholder values:

```javascript
// Line 10 - Replace with your actual Public Key
emailjs.init('YOUR_PUBLIC_KEY');

// Line 214 - Replace with your actual Service ID and Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

Replace:
- `YOUR_PUBLIC_KEY` with your actual public key
- `YOUR_SERVICE_ID` with your service ID
- `YOUR_TEMPLATE_ID` with your template ID

## Step 6: Test the Contact Form

1. Open your portfolio in a browser
2. Navigate to the Contact section
3. Fill in the form with test data
4. Click "Envoyer le message"
5. Check your email (yassirbensmina73@gmail.com) for the test message

## Features Included

✅ **Form Validation:**
- All fields are required
- Email format validation
- Error messages in French/English based on selected language

✅ **User Feedback:**
- Loading state while sending
- Success message after successful send
- Error message if sending fails
- Form resets after successful submission

✅ **Language Support:**
- Success/error messages adapt to current language (FR/EN)

## Troubleshooting

**Email not sending:**
- Verify your EmailJS credentials are correct
- Check that your email service is properly connected
- Ensure your template variables match the JavaScript code

**Template variables not working:**
- Make sure your template uses: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
- These must match exactly what's sent in the JavaScript

**Rate limiting:**
- EmailJS free tier has limits (200 emails/month)
- Consider upgrading if you expect high volume

## Security Notes

- Your Public Key is safe to expose in client-side code
- Never share your Private Key
- EmailJS handles the secure email sending on their servers
- The recipient email (yassirbensmina73@gmail.com) is set in the template, not exposed to users

## Alternative Services

If you prefer not to use EmailJS, you can also use:
- Formspree (https://formspree.io/)
- Netlify Forms (if hosting on Netlify)
- A custom backend with Nodemailer
