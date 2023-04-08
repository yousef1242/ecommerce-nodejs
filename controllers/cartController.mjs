import mongoose from "mongoose"
import { Cart } from "../models/cartModels.mjs"


//get cart page
export const getCartController = (req,res) => {
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Cart.find({userId : req.session.userId}).then((resault) => {
            let subTotal = 0;
            
            resault.forEach((product) => {
                subTotal += product.price * product.amount;    
                })
                
            res.render('cart',{
                titleName : "cart",
                isUser : req.session.userId,
                userName:req.session.userName,
                products : resault,
                subTotal: subTotal,
            })
        }).catch((err) => {
            console.log('faild to add product')
            console.log(err)
        })
    })
}



//post cart page
export const postCartPage = (req,res) => {
    if (req.session.userId) {
        mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
            const addCart = new Cart({
                name : req.body.name,
                price : req.body.price,
                iamge : req.body.iamge,
                userId : req.session.userId,
                productId : req.body.productId,
            })
            return addCart.save()
        }).then(resault => {
            res.redirect('/#products')
            req.flash('cartAdeddMessage','Product is added')
        })
    } else {
        res.redirect('/')
        req.flash('cartValidator',"You need to signup")
    }
}



//delete product from cart
export const deleteProduct = (req,res) => {
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Cart.findByIdAndDelete(req.body.cartId).then(() => {
            res.redirect('/cart')
        })
    })
}




//delete product from cart
export const editProduct = (req,res) => {
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Cart.findByIdAndDelete(req.body.cartId).then(() => {
            res.redirect('/cart')
        })
    })
}