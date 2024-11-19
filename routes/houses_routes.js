require('dotenv').config();
const express = require('express');
const { Client, Databases, Query, ID } = require('node-appwrite');
const router = express.Router();

// ⚙️ Configurations Appwrite
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const databaseId = process.env.APPWRITE_DATABASE_ID;
const houseCollectionId = process.env.APPWRITE_HOUSE_COLLECTION_ID;

// Route 🟢 GET pour obtenir tous les documents de la collection
router.get('/', async (req, res) => {
    try {
        const houses = await databases.listDocuments(databaseId, houseCollectionId);
        res.status(200).json(houses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router