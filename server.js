// Express
const express = require('express');
// Routes
const equipmentsRoutes = require('./routes/equipments_routes');
const roomsRoutes = require('./routes/rooms_routes');
const housesRoutes = require('./routes/houses_routes');
const eventsRoutes = require('./routes/events_routes');
// Cron Job
const cronJob = require('./cron.js')
// MQTT
const mqttClient = require('./mqtt/mqttClient.js');

const PORT = 3000;

const app = express();
app.use(express.json());

// Routes
app.use('/api/equipments', equipmentsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/houses', housesRoutes);
app.use('/api/events', eventsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    mqttClient;
});

// Start the cron job
cronJob.start();