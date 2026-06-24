async function triggerDailyApi() {

  const url = 'https://alert-apm-users-alert-apm-users.up.railway.app/alert/daily-update';

  try {
    console.log(`[${new Date().toISOString()}] Sending daily POST request...`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    console.log(`[${new Date().toISOString()}] Success! API triggered successfully.`);
    process.exit(0);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Cron job failed:`, error.message);
    process.exit(1); 
  }
}

triggerDailyApi();