const validateItem = (req, res, next) => {
    const { name, category, quantity, price } = req.body;

    if (!name || !category || quantity === undefined || price === undefined) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields (name, category, quantity, price) are required." 
        });
    }

    if (typeof quantity !== 'number' || quantity < 0 || typeof price !== 'number' || price < 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Quantity and price must be positive numbers." 
        });
    }

    next();
};

module.exports = { validateItem };