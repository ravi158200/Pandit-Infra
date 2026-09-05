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

/**
 * sendForgotPasswordEmail
 * Sends a password reset request notification email containing the user's Name and Designation.
 * 
 * @param {Object} params
 * @param {string} params.name - User's full name
 * @param {string} params.designation - User's designation / title
 * @param {string} [params.email] - Optional user email address
 */
export const sendForgotPasswordEmail = async ({ name, designation, email }) => {
  try {
    let transporter;

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
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'admin@panditinfra.com';
    const recipientEmail = email || adminEmail;

    const mailOptions = {
      from: '"Pandit Infra System" <noreply@panditinfra.com>',
      to: recipientEmail,
      subject: `Password Reset Request - ${name} (${designation})`,
      text: `Password Reset Request received:\n\nName: ${name}\nDesignation: ${designation}\nEmail: ${email || 'Not specified'}\nTime: ${new Date().toLocaleString()}\n\nPlease process this password reset request.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #ea580c; margin-top: 0;">Password Reset Assistance Request</h2>
          <p>A user has requested a password reset with the following verification details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9; width: 30%;">Full Name:</td>
              <td style="padding: 12px 16px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9;">Designation:</td>
              <td style="padding: 12px 16px;">${designation}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9;">Contact Email:</td>
              <td style="padding: 12px 16px;">${email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9;">Request Time:</td>
              <td style="padding: 12px 16px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <p style="font-size: 13px; color: #64748b;">Please review this request and assist the employee with credentials reset.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 11px; color: #94a3b8; margin-bottom: 0;">Pandit Infra Security System Notification</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Forgot Password Email sent: %s', info.messageId);

    if (info.messageId && !process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Error sending forgot password email: ', error);
    throw error;
  }
};

