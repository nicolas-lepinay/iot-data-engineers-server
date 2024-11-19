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
const roomCollectionId = process.env.APPWRITE_ROOM_COLLECTION_ID;

// Route 🟢 GET pour obtenir tous les documents de la collection
router.get('/', async (req, res) => {
    try {
        const rooms = await databases.listDocuments(databaseId, roomCollectionId);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route 🟢 GET pour obtenir toutes les rooms d'une maison donnée
router.get('/house/:houseId', async (req, res) => {
    const houseId = req.params.houseId;
    try {
        // Récupérer toutes les rooms
        const rooms = await databases.listDocuments(databaseId, roomCollectionId, [
            Query.equal('house_id', houseId)
        ]);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router