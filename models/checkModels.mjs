import mongoose from "mongoose";

const checkShcema = mongoose.Schema({
    country : String,
    firstName : String,
    lastName : String,
    adress : String,
    city : String,
    phone : Number,
    userName : String,
    userId : String,
    price : Number,
    productNames: [String],
    productprice: [Number]
})



export const orders = mongoose.model("Order",checkShcema)