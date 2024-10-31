require('dotenv').config();
const express = require('express');
const { Client, Databases, ID } = require('node-appwrite');
const PORT = 3000;
const app = express();
app.use(express.json());

// Configurations Appwrite
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const databaseId = process.env.APPWRITE_DATABASE_ID;
const equipmentCollectionId = process.env.APPWRITE_EQUIPMENT_COLLECTION_ID;

// Route GET pour obtenir tous les documents de la collection
app.get('/equipments', async (req, res) => {
    try {
        const equipments = await databases.listDocuments(databaseId, equipmentCollectionId);
        res.status(200).json(equipments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route GET pour obtenir un document spécifique par ID
app.get('/equipments/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        const equipment = await databases.getDocument(databaseId, equipmentCollectionId, documentId);
        res.status(200).json(equipment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Route POST pour créer un nouveau document dans la collection
app.post('/equipments', async (req, res) => {
    try {
        const equipment = req.body;
        const document = await databases.createDocument(databaseId, equipmentCollectionId, ID.unique(), equipment);
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route PUT pour mettre à jour un document existant par ID
app.put('/equipments/:id', async (req, res) => {
    const documentId = req.params.id;
    const updatedData = req.body;
    try {
        await databases.updateDocument(databaseId, equipmentCollectionId, documentId, updatedData);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route DELETE pour supprimer un document par ID
app.delete('/equipments/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        await databases.deleteDocument(databaseId, equipmentCollectionId, documentId);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});