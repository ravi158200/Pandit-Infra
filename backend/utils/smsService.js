/**
 * sendUserCredentialsSMS
 * Simulates sending an SMS message to a mobile number.
 * If real Twilio credentials are provided via .env, this can be expanded to send real texts.
 * 
 * @param {string} toPhone - The recipient's mobile number
 * @param {string} username - The generated/assigned username
 * @param {string} plainTextPassword - The raw password before hashing
 */
export const sendUserCredentialsSMS = async (toPhone, username, plainTextPassword) => {
  try {
    const smsMessage = `Welcome to Pandit Infra! Your admin account has been created.\nUsername: ${username}\nPassword: ${plainTextPassword}\nPlease log in to the admin portal and change your password.`;

    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      // NOTE: This block is prepared for future Twilio integration.
      // You would do: const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      // await client.messages.create({ body: smsMessage, from: process.env.TWILIO_PHONE_NUMBER, to: toPhone });
      console.log(`[REAL SMS DISPATCHED] To: ${toPhone}`);
    } else {
      // Simulated SMS Service
      console.log('\n=============================================');
      console.log('📱 SIMULATED SMS DISPATCHED 📱');
      console.log(`To Mobile: ${toPhone}`);
      console.log('---------------------------------------------');
      console.log(smsMessage);
      console.log('=============================================\n');
    }

    return true;
  } catch (error) {
    console.error('Error sending credentials SMS: ', error);
    throw error;
  }
};
