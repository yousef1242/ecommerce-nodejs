import mongoose from "mongoose"
import { Cart } from "../models/cartModels.mjs"
import { orders } from "../models/checkModels.mjs"
import { validationResult } from "express-validator"



export const getCheckController = (req,res,next) => {
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        Cart.find({userId : req.session.userId}).then((resaults) => {
            let subTotal = 0
            resaults.forEach((product) => {
                subTotal += product.price * product.amount;
                })
                const checkoutErrors = req.flash('checkoutErrors')
            res.render('check',{
                products : resaults,
                titleName : "checkout",
                isUser : req.session.userId,
                userName:req.session.userName,
                subTotal : subTotal,
                checkoutErrors : checkoutErrors
            })
        })
    })
}


export const postCheckController = (req,res,next) => {
    mongoose.connect(process.env.CONNECT_MONGODB)
    .then(() => {
      Cart.find({ userId: req.session.userId })
        .then((results) => {
          let productNames = [];
          let productprice = [];
  
          results.forEach((product) => {
            productNames.push(product.name);
            productprice.push(product.price);
          });
          if (validationResult(req).isEmpty()) {
                      const newOrder = new orders({
            country: req.body.countryCode,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            adress: req.body.adress,
            city: req.body.city,
            phone: req.body.phone,
            userName: req.session.userName,
            userId: req.session.userId,
            productNames: productNames, // Add the product names to the order
            productprice: productprice, // Add the product price to the order
          });
          newOrder.save()
            .then((results) => {
                req.session.OrdersProductId = results
                res.redirect('/')
                req.flash('messageOrderAccept','Order is accepted')
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Error saving order data');
            });
          } else {
            req.flash('checkoutErrors',validationResult(req).array())
            res.redirect('/cart/checkout')
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error retrieving cart data');
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error connecting to MongoDB');
    });
}