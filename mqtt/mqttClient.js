require('dotenv').config();
const mqtt = require('mqtt');
const { Client, Databases } = require('node-appwrite');

// Configurations MQTT
const mqttHost = process.env.MQTT_HOST;
const mqttPort = parseInt(process.env.MQTT_PORT);
const mqttUsername = process.env.MQTT_USERNAME;
const mqttPassword = process.env.MQTT_PASSWORD;

// Connexion au broker MQTT
const client = mqtt.connect(`mqtts://${mqttHost}`, {
  port: mqttPort,
  username: mqttUsername,
  password: mqttPassword,
});

// Configurations Appwrite
const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(appwriteClient);
const equipmentCollectionId = process.env.APPWRITE_EQUIPMENT_COLLECTION_ID;
const databaseId = process.env.APPWRITE_DATABASE_ID;

client.on('connect', () => {
    console.log('MQTT client connected successfully');
    client.subscribe('equipments/+/status', (err) => {
      if (!err) {
        console.log('Subscribed to topic equipments/+/status');
      } else {
        console.error('Subscription error:', err);
      }
    });
  });
  
  client.on('message', async (topic, message) => {
    try {
      const equipmentId = topic.split('/')[1];
      const status = message.toString(); // "on" or "off"
  
      console.log(`Received message on topic: ${topic} with status: ${status}`);
  
      // Mise à jour de l'état dans AppWrite
      //await databases.updateDocument(databaseId, equipmentCollectionId, equipmentId, { status });
    } catch (error) {
      console.error('Failed to update document in Appwrite:', error.message);
    }
  });
  
  module.exports = client;
