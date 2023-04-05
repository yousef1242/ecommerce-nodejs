import mongoose from "mongoose";
import { Item } from "../models/ProductModel.mjs";

export const getProductsDetailsController = (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send('Invalid product ID');
    }
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Item.findById(productId).then((product) => {
            if (!Item) {
                return res.status(404).send('Product not found');
            }
    
            const cartValidator = req.flash('cartValidator')[0]
            res.render('productDetails', {
            titleName : "productDetails" , 
            product : product,
            isUser : req.session.userId,
            userName:req.session.userName,
            cartValidator : cartValidator
        });
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching product details');
        });
    })
};