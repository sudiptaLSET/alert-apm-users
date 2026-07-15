import { sendBulkAlertEmails } from "./emailService.js";
import { getUserList } from "./getUserList.js";
import { sendWhatsAppMessage } from "./whatsappService.js";

const toDDMMYYYY = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
};
export const sendDailyTaskAlert = async () => {
    const sent = [];
    const failed = [];

    try {

        const userList = await getUserList();
        
        console.log("Userlist--->",userList?.result?.employees);

        const employees = userList?.result?.employees
        // return userList;

        const messageVersions = [];

        for (const user of employees) {
            console.log(`Preparing to send alert to ${user.employee_name}...`);

            // stopped whatsapp messages because funtoo's account is connected for this

            // try {
            //     const data = await sendWhatsAppMessage(user);
            //     console.log(`✅ WhatsApp sent to ${user.name} (${user.number}). Message ID: ${data.message_id || 'N/A'}`);
            //     sent.push({ channel: "whatsapp", name: user.name, number: user.number, message_id: data.message_id || null });
            // } catch (error) {
            //     console.error(`❌ WhatsApp failed for ${user.name}:`, error.message);
            //     failed.push({ channel: "whatsapp", name: user.name, number: user.number, error: error.message });
            // }
            if((user.employee_name=="SUDIPTA PAUL" &&  user.work_email=="sudipta@lifesciencetrust.com")||(user.employee_name=="Rahul Shaw" &&  user.work_email=="rahulshaw@lifesciencetrust.com")){
                messageVersions.push({
                    to: [{ email: user.work_email }],
                    params: {
                        name: user.employee_name,
                        missedDays: user?.missed_working_days?.length,
                        dates: user?.missed_working_days?.slice().reverse().map(toDDMMYYYY).join(", ")
                    }
                });
            }
        }

        if (messageVersions.length > 0) {
            try {
                await sendBulkAlertEmails(
                    'Daily Task Update Alert Testing',
                    `<h3>Hello {{params.name}}!</h3><p>This is a reminder that you have not updated your daily task report for the past {{params.missedDays}} days.
                    Missed days are :
                    {{params.dates}}
                    </p>`,
                    messageVersions
                );
                for (const version of messageVersions) {
                    console.log(`✅ Email sent to ${version.params.name} (${version.to[0].email}). Missed ${version.params.missedDays} days`);
                    sent.push({ channel: "email", name: version.params.name, email: version.to[0].email });
                }
            } catch (error) {
                for (const version of messageVersions) {
                    console.error(`❌ Email failed for ${version.params.name}:`, error.message);
                    failed.push({ channel: "email", name: version.params.name, email: version.to[0].email, error: error.message });
                }
            }
        }
    } catch (err) {
        console.log("error -> ", err);
        throw err;
    }

    return { sent, failed };
};
