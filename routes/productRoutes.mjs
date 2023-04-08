import express from 'express';
const router = express.Router();
import { getProductsDetailsController } from '../controllers/productController.mjs';
import bodyParser from 'body-parser';
import { postReview } from '../controllers/reviewsController.mjs';
import { check } from 'express-validator';
import { notAuth } from './guard/isAuth.mjs';

router.get('/products/:id', getProductsDetailsController);


router.post(
    '/products/:id/addreview',
    bodyParser.urlencoded({extended:true}),
    notAuth,
    check('reviewdes').not().isEmpty().withMessage('review is required!!'),
    postReview
)

export default router;