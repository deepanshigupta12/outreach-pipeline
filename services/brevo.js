const axios = require("axios");
require("dotenv").config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;

async function sendEmail(toEmail, name, domain) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Deepanshi",
          email: "deepanshigupta98765@gmail.com" // MUST be verified in Brevo
        },
        to: [
          {
            email: toEmail,
            name: name
          }
        ],
        subject: "TEST EMAIL " + Date.now(),

        // IMPORTANT (for deliverability)
        textContent: `Hi ${name}, I noticed your work at ${domain}. Let's connect!`,

        htmlContent: `
          <p>Hi ${name},</p>
          <p>I noticed your work at <b>${domain}</b> and found it really interesting.</p>
          <p>I’m currently building automation tools for outreach and would love to explore a quick collaboration.</p>
          <p>Would you be open to a quick chat?</p>
          <p>Best regards,<br/>Deepanshi</p>
        `
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(` Email sent to ${toEmail}`);
    console.log("Brevo Response:", response.data);

  } catch (error) {
    console.error(` Failed to send email to ${toEmail}`);
    console.error(error.response?.data || error.message);
  }
}

module.exports = { sendEmail };