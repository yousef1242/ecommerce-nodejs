import mongoose from "mongoose"
import { Review } from "../models/reviewsModels.mjs"
import { validationResult } from "express-validator"




export const postReview = (req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
        const newReview = new Review({
          username: req.session.userName,
          reviewdes: req.body.reviewdes,
          productDetailsId: req.session.productDetailsId
        });
        return newReview.save();
      }).then((result) => {
        res.redirect(`/products/${result.productDetailsId}/#${result.reviewdes}`);
      }).catch((err) => {
        console.log(err);
        res.status(500).send('Error saving review');
      });
    } else {
      req.flash('reviewError', errors.array());
      res.redirect(`/products/${req.session.productDetailsId}/#btn-review`);
    }
}

