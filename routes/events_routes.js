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
const equipmentCollectionId = process.env.APPWRITE_EQUIPMENT_COLLECTION_ID;
const eventCollectionId = process.env.APPWRITE_EVENT_COLLECTION_ID;

// Route 🟢 GET pour obtenir tous les documents de la collection
router.get('/', async (req, res) => {
    try {
        const events = await databases.listDocuments(databaseId, eventCollectionId);
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route 🟢 GET pour obtenir tous les événements d'une maison donnée
router.get('/house/:houseId', async (req, res) => {
    const houseId = req.params.houseId;
    try {
        // Récupérer tous les équipements de la maison
        const equipments = await databases.listDocuments(databaseId, equipmentCollectionId, [
            Query.equal('house_id', houseId)
        ]);

        if (equipments.total === 0) {
            return res.status(404).json({ message: 'Aucun équipement trouvé pour cette maison.' });
        }

        // Extraire les IDs des équipements
        const equipmentIds = equipments.documents.map(equipment => equipment.$id);

        // Étape 2 : Récupérer tous les événements associés aux équipements trouvés
        const events = await databases.listDocuments(databaseId, eventCollectionId, [
            Query.equal('equipment_id', equipmentIds)
        ]);

        res.status(200).json({
            total: events.length,
            documents: events
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route 🔵 POST pour créer un nouveau document dans la collection
router.post('/', async (req, res) => {
    try {
        const event = req.body;
        const document = await databases.createDocument(databaseId, eventCollectionId, ID.unique(), event);
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Route 🔴 DELETE pour supprimer un document par ID
router.delete('/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        await databases.deleteDocument(databaseId, eventCollectionId, documentId);
        res.status(200).json({ message: 'Document deleted successfully.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router