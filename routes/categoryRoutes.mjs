import { Router } from 'express';
import { getCategoryController } from '../controllers/categoryController.mjs';




const router = Router();

router.get('/category/:categoryName', getCategoryController);

export default router;