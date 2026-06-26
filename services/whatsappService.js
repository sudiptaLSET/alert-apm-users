import "dotenv/config";

const MYOP_API_URL = process.env.MYOP_API_URL;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const X_MYOP_COMPANY_ID = process.env.X_MYOP_COMPANY_ID;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

export const sendWhatsAppMessage = async (user) => {
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

    if (!response.ok) {
        throw new Error(`Status ${response.status}: ${JSON.stringify(data)}`);
    }

    return data;
};
