import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

export const sendAlertEmail = async (recipient, subject, htmlContent) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent,
      sender: { name: 'TEST', email: 'sudipta@lifesciencetrust.com' },
      to: [{email:recipient}],
    });

    return result;
  } catch (error) {
    console.error('Failed to send email via Brevo:', error.message);
    throw error;
  }
};

export const sendBulkAlertEmails = async (subject, htmlContent, messageVersions) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent,
      sender: { name: 'TEST', email: 'sudipta@lifesciencetrust.com' },
      messageVersions,
    });

    return result;
  } catch (error) {
    console.error('Failed to send bulk email via Brevo:', error.message);
    throw error;
  }
};
