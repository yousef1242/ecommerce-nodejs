import mongoose from "mongoose";
import { Item, getAllProducts } from "../models/ProductModel.mjs";
import { Review } from "../models/reviewsModels.mjs";



export const getProductsDetailsController = (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send('Invalid product ID');
    }
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Item.findById(productId).then((product) => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            req.session.productDetailsId = product._id;
            Review.find({productDetailsId : req.session.productDetailsId}).then((result) => {
                const cartValidator = req.flash('cartValidator')[0];
                const errorReviewInput = req.flash('reviewError')[0];
                res.render('productDetails', {
                    titleName : "Product Details",
                    product : product,
                    isUser : req.session.userId,
                    userName: req.session.userName,
                    cartValidator : cartValidator,
                    resault : result,
                    errorReviewInput : errorReviewInput
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Error fetching product details');
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching product details');
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error connecting to database');
    });
};