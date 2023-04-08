import mongoose from "mongoose"
import { orders } from "../models/checkModels.mjs"
import { Cart } from "../models/cartModels.mjs"






export const getMyOrdersController = (req,res) => {
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        orders.find({userId : req.session.userId}).then((resaults) => {
                res.render('myorders',{
                    orders : resaults,
                    isUser : req.session.userId ,
                    userName:req.session.userName,
                    titleName : 'My Orders',
            })
        })
    })
}