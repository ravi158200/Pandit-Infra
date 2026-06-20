import nodemailer from 'nodemailer';

/**
 * sendUserCredentialsEmail
 * Automatically creates an Ethereal test account and sends an email with the user credentials.
 * If SMTP credentials are provided in .env, it uses those instead.
 * 
 * @param {string} toEmail - The recipient's email address
 * @param {string} username - The generated/assigned username
 * @param {string} plainTextPassword - The raw password before hashing
 */
export const sendUserCredentialsEmail = async (toEmail, username, plainTextPassword) => {
  try {
    let transporter;

    // Use environment variables if provided
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_PORT == 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback to Ethereal Email for testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Setup email data
    const mailOptions = {
      from: '"Pandit Infra Admin" <admin@panditinfra.com>',
      to: toEmail,
      subject: 'Welcome to Pandit Infra - Account Activated',
      text: `Hello ${username},\n\nYour administrative account has been successfully created and activated.\n\nPlease log in to the admin portal to securely set up your profile.\n\nRegards,\nPandit Infra Admin Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ea580c;">Welcome to Pandit Infra!</h2>
          <p>Hello <strong>${username}</strong>,</p>
          <p>Your administrative account has been successfully created and activated.</p>
          <p><em>Please log in to the admin portal to securely set up your profile. For security reasons, your credentials are provided separately by the administrator.</em></p>
          <br/>
          <p>Regards,<br/><strong>Pandit Infra Admin Team</strong></p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // If using Ethereal, log the preview URL
    if (info.messageId && !process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Error sending credentials email: ', error);
    throw error;
  }
};
