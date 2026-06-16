const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/inventoryController');
const { validateItem } = require('../middleware/validation');

// Map operations to API endpoints
router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', validateItem, createItem);
router.put('/:id', validateItem, updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
