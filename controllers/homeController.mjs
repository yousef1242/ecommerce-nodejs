import { getAllProducts } from "../models/ProductModel.mjs"




export function getProductsHomeController(req,res) {
    getAllProducts()
    .then((products) => {
        const cartValidator = req.flash('cartValidator')[0]
        res.render('index',{
            products : products,
            isUser : req.session.userId,
            userName:req.session.userName,
            titleName : "Home",
            cartValidator : cartValidator
        })
    })
}



