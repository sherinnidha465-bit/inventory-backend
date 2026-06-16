let inventory = require('../model/inventoryData');

// 1. Fetch All Items & Query Operations (Search/Filter)
const getItems = (req, res, next) => {
    try {
        let items = [...inventory];
        const { category, quantity, search } = req.query;

        // Search operation (by item name)
        if (search) {
            items = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Filtering by category
        if (category) {
            items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
        }

        // Filtering by stock quantity (items less than or equal to targeted amount)
        if (quantity) {
            items = items.filter(item => item.quantity <= parseInt(quantity));
        }

        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        next(error);
    }
};

// 2. Fetch Single Item by ID
const getItemById = (req, res, next) => {
    try {
        const item = inventory.find(i => i.id === parseInt(req.params.id));
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found." });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

// 3. Add New Item
const createItem = (req, res, next) => {
    try {
        const { name, category, quantity, price } = req.body;
        
        // Dynamic basic ID auto-incrementing fallback
        const newId = inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1;
        
        const newItem = {
            id: newId,
            name,
            category,
            quantity: Number(quantity),
            price: Number(price)
        };
        
        inventory.push(newItem);
        res.status(201).json({ success: true, message: "Item added successfully.", data: newItem });
    } catch (error) {
        next(error);
    }
};

// 4. Update Item
const updateItem = (req, res, next) => {
    try {
        const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id));
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found." });
        }

        const { name, category, quantity, price } = req.body;
        
        inventory[itemIndex] = {
            ...inventory[itemIndex],
            name,
            category,
            quantity: Number(quantity),
            price: Number(price)
        };

        res.status(200).json({ success: true, message: "Item updated successfully.", data: inventory[itemIndex] });
    } catch (error) {
        next(error);
    }
};

// 5. Delete Item
const deleteItem = (req, res, next) => {
    try {
        const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id));
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found." });
        }

        const deletedItem = inventory.splice(itemIndex, 1);
        res.status(200).json({ success: true, message: "Item deleted successfully.", data: deletedItem[0] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};