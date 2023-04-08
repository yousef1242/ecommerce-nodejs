import { getAllProducts } from "../models/ProductModel.mjs"




export function getProductsHomeController(req,res) {
    getAllProducts()
    .then((products) => {
        const cartValidator = req.flash('cartValidator')[0]
        const cartAdeddMessage = req.flash('cartAdeddMessage')[0]
        const messageOrderAccept = req.flash('messageOrderAccept')[0]
        res.render('index',{
            products : products.items,
            isUser : req.session.userId,
            userName:req.session.userName,
            titleName : "Home",
            cartValidator : cartValidator,
            cartAdeddMessage : cartAdeddMessage,
            messageOrderAccept : messageOrderAccept,
        })
    })
}



