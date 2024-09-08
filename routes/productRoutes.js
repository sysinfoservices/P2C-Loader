const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


router.post('/get-products', productController.getProducts);


module.exports = router;
