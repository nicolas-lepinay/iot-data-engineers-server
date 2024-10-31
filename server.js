const express = require('express');
const apiRoutes = require('./routes');
const PORT = 3000;

const app = express();
app.use(express.json());

// Préfixe '/api' pour toutes les routes du routeur
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
