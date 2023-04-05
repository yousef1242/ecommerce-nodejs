import mongoose from "mongoose";

const cartShcema = mongoose.Schema({
        name: String,
        price: Number,
        iamge : String,
        amount : {type:Number,default:1},
        userId: String,
        productId: String,
})



export const Cart = mongoose.model("Cart",cartShcema)