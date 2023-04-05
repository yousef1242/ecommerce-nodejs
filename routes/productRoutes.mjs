import express from 'express';
const router = express.Router();
import { getProductsDetailsController } from '../controllers/productController.mjs';

router.get('/products/:id', getProductsDetailsController);

export default router;