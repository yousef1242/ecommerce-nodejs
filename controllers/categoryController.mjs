import mongoose from "mongoose";
import { Item } from "../models/ProductModel.mjs";


//men products
export const getCategoryController = (req, res) => {
    const productCategory = req.params.categoryName;

    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Item.find({ category: productCategory }).then((products) => {
            if (products.length === 0) {
                return res.status(404).send('Products not found');
            }
    
            const cartValidator = req.flash('cartValidator')[0]
            res.render('category', { 
                Categoryname : productCategory ,
                titleName : productCategory,
                products:products,
                isUser : req.session.userId ,
                userName:req.session.userName,
                cartValidator : cartValidator
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching products');
        });
    })
};

