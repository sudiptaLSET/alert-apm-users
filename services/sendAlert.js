import "dotenv/config";

const MYOP_API_URL = process.env.MYOP_API_URL;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const X_MYOP_COMPANY_ID = process.env.X_MYOP_COMPANY_ID;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

const userList = [
    { name: "Rahul Shaw", number: "84276164" },
    { name: "Rahul Saha", number: "82503737" },
    { name: "Sujan", number: "8971290044" },
    { name: "Sudipta", number: "7044789194" },


];

export const sendWhatsAppAlert = async () => {
    const sent = [];
    const failed = [];

    try {

        // const users = await fetch('/fetch-users');



        for (const user of userList) {
            console.log(`Preparing to send message to ${user.name}...`);


            const payload = {
                phone_number_id: PHONE_NUMBER_ID,
                customer_country_code: "91",
                customer_number: user.number,
                data: {
                    type: "template",
                    context: {
                        template_name: "missed_call",
                        language_code: "en",
                    }
                },
                reply_to: null,
                myop_ref_id: null
            };

            try {

                // using myoperator whatsapp api

                const response = await fetch(MYOP_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${AUTH_TOKEN}`,
                        "X-MYOP-COMPANY-ID": `${X_MYOP_COMPANY_ID}`

                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok) {
                    console.log(`✅ Success: Message routed to ${user.name} (${user.number}). Message ID: ${data.message_id || 'N/A'}`);
                    sent.push({ name: user.name, number: user.number, message_id: data.message_id || null });
                } else {
                    console.error(`❌ Failed for ${user.name}: Status ${response.status}`, data);
                    failed.push({ name: user.name, number: user.number, status: response.status });
                }
            } catch (error) {
                console.error(`🚨 Network error while sending to ${user.name}:`, error.message);
                failed.push({ name: user.name, number: user.number, error: error.message });
            }
        }
    }
    catch (err) {
        console.log("error - > ", err)
        throw err;
    }

    return { sent, failed };
}
