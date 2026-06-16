const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventoryRoutes');
const errorHandler = require('./middleware/errorHandler');

// Setup configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Universal Middleware
app.use(cors());
app.use(express.json()); 

// Mount Feature Routes
app.use('/api/inventory', inventoryRoutes);

// Server Base Sanity Endpoint
app.get('/', (req, res) => {
    res.send('Inventory Management API is running cleanly...');
});

// Post-Route Error Capture Injection
app.use(errorHandler);

// Launch Node Context
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
