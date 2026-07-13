import { sendAlertEmail } from "./emailService.js";
import { sendWhatsAppMessage } from "./whatsappService.js";
const userList = [
    { name: "Rahul Shaw", number: "8420176164", email: "rahulshaw@lifesciencetrust.com", days: 3 },
    { name: "Sudipta", number: "7044789194", email: "paulsudipta929@gmail.com", days: 15 },
];

export const sendDailyTaskAlert = async () => {
    const sent = [];
    const failed = [];

    try {

        // const result = await fetch('/users');
        

        for (const user of userList) {
            console.log(`Preparing to send alert to ${user.name}...`);

            // stopped whatsapp messages because funtoo's account is connected for this

            // try {
            //     const data = await sendWhatsAppMessage(user);
            //     console.log(`✅ WhatsApp sent to ${user.name} (${user.number}). Message ID: ${data.message_id || 'N/A'}`);
            //     sent.push({ channel: "whatsapp", name: user.name, number: user.number, message_id: data.message_id || null });
            // } catch (error) {
            //     console.error(`❌ WhatsApp failed for ${user.name}:`, error.message);
            //     failed.push({ channel: "whatsapp", name: user.name, number: user.number, error: error.message });
            // }

            try {
                await sendAlertEmail(
                    user.email,
                    'Daily Task Update Alert',
                    `<h1>Hello ${user.name}!</h1><p>This is a reminder that you have not updated your daily task report for the past ${user.days} days.</p>`
                );
                console.log(`✅ Email sent to ${user.name} (${user.email}).`);
                sent.push({ channel: "email", name: user.name, email: user.email });
            } catch (error) {
                console.error(`❌ Email failed for ${user.name}:`, error.message);
                failed.push({ channel: "email", name: user.name, email: user.email, error: error.message });
            }
        }
    } catch (err) {
        console.log("error -> ", err);
        throw err;
    }

    return { sent, failed };
};
