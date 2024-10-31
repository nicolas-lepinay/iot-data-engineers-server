// Cron job to hit endpoint every 10 sec to keep backend alive on Render.com
const cron = require('cron');
const https = require('https');

const backendUrl = "https://iot-data-engineers-server.onrender.com/api/equipments";

const cronJob = new cron.CronJob('*/10 * * * *', function () {
    // Function executed every 10 minutes
    console.log('Waking up server...')

    // Perform an HTTPS GET request to hit a backend endpoint
    https.get(backendUrl, (res) => {
        res.statusCode === 200 
        ? console.log("Server woke up successfully.")
        : console.error(`Failed to wake up server with status code ${res.statusCode}.`)
        
    }).on('error', (err) => {
        console.error('Error while waking server up: ', err.message);
    })
});

// Export the cron job
module.exports = cronJob;