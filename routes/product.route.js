import express from 'express';
import { upload, authenticate } from '../middlewares/index.js';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

// Route: Get all products
router.get('/', productController.getAllProducts);

// Route: Get create product page
router.get('/create', authenticate, productController.getCreateProductPage);

// Route: Create a new product
router.post('/create', authenticate, upload.single('image'), productController.createProduct);

// Route: Get product by ID
router.get('/product/:id', authenticate, productController.showProduct);

export default router;
