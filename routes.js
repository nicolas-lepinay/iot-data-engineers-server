require('dotenv').config();
const express = require('express');
const { Client, Databases, ID } = require('node-appwrite');
const router = express.Router();

// Configurations Appwrite
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const databaseId = process.env.APPWRITE_DATABASE_ID;
const equipmentCollectionId = process.env.APPWRITE_EQUIPMENT_COLLECTION_ID;
const houseCollectionId = process.env.APPWRITE_HOUSE_COLLECTION_ID;
const roomCollectionId = process.env.APPWRITE_ROOM_COLLECTION_ID;
const eventCollectionId = process.env.APPWRITE_EVENT_COLLECTION_ID;

// 🍔 ------- GET ALL -------

// Route GET pour obtenir tous les documents de la collection
router.get('/equipments', async (req, res) => {
    try {
        const equipments = await databases.listDocuments(databaseId, equipmentCollectionId);
        res.status(200).json(equipments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir tous les documents de la collection
router.get('/houses', async (req, res) => {
    try {
        const houses = await databases.listDocuments(databaseId, houseCollectionId);
        res.status(200).json(houses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir tous les documents de la collection
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await databases.listDocuments(databaseId, roomCollectionId);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir tous les documents de la collection
router.get('/events', async (req, res) => {
    try {
        const events = await databases.listDocuments(databaseId, eventCollectionId);
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// 🍔 ------- GET BY ID -------

// Route GET pour obtenir un document spécifique par ID
router.get('/equipments/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        const equipment = await databases.getDocument(databaseId, equipmentCollectionId, documentId);
        res.status(200).json(equipment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir tous les équipements d'une maison donnée
router.get('/equipments/house/:houseId', async (req, res) => {
    const houseId = req.params.houseId;
    try {
        // Récupérer tous les équipements
        const equipments = await databases.listDocuments(databaseId, equipmentCollectionId);
        // Filtrer les équipements dont `houses.$id` correspond à `houseId`
        const filteredEquipments = equipments.documents.filter(equipment => {
            return equipment.houses && equipment.houses.$id === houseId;
        });
        res.status(200).json({
            total: filteredEquipments.length,
            documents: filteredEquipments
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir toutes les rooms d'une maison donnée
router.get('/rooms/house/:houseId', async (req, res) => {
    const houseId = req.params.houseId;
    try {
        // Récupérer toutes les rooms
        const rooms = await databases.listDocuments(databaseId, roomCollectionId);
        // Filtrer les rooms dont `houses.$id` correspond à `houseId`
        const filteredRooms = rooms.documents.filter(room => {
            return room.houses && room.houses.$id === houseId;
        });
        res.status(200).json({
            total: filteredRooms.length,
            documents: filteredRooms
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir tous les événements d'une maison donnée
router.get('/events/house/:houseId', async (req, res) => {
    const houseId = req.params.houseId;
    try {
        // Récupérer tous les équipements pour la maison donnée
        const equipments = await databases.listDocuments(databaseId, equipmentCollectionId);
        const filteredEquipments = equipments.documents.filter(equipment => {
            return equipment.houses && equipment.houses.$id === houseId;
        });

        if (filteredEquipments.length === 0) {
            return res.status(404).json({ message: 'Aucun équipement trouvé pour cette maison.' });
        }

        // Récupérer tous les événements pour les équipements trouvés
        const events = await databases.listDocuments(databaseId, eventCollectionId);
        const filteredEvents = events.documents.filter(event => {
            return filteredEquipments.some(equipment => event.equipments && event.equipments.$id === equipment.$id);
        });

        res.status(200).json({
            total: filteredEvents.length,
            documents: filteredEvents
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



// 🍔 ------- POST -------

// Route POST pour créer un nouveau document dans la collection
router.post('/equipments', async (req, res) => {
    try {
        const equipment = req.body;
        const document = await databases.createDocument(databaseId, equipmentCollectionId, ID.unique(), equipment);
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 🍔 ------- PUT -------

// Route PUT pour mettre à jour un document existant par ID
router.put('/equipments/:id', async (req, res) => {
    const documentId = req.params.id;
    const updatedData = req.body;
    try {
        await databases.updateDocument(databaseId, equipmentCollectionId, documentId, updatedData);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 🍔 ------- DELETE -------

//Route DELETE pour supprimer un document par ID
router.delete('/equipments/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        await databases.deleteDocument(databaseId, equipmentCollectionId, documentId);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;