const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Routes for Inventory Management
router.get('/products', inventoryController.getAllProducts);
router.get('/products/:productId', inventoryController.getProductById);
router.post('/products', inventoryController.addProduct);
router.put('/products/:productId', inventoryController.updateProduct);
router.delete('/products/:productId', inventoryController.deleteProduct);

module.exports = router;
