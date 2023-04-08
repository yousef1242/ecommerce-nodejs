import mongoose from "mongoose";

const ReviewShcema = mongoose.Schema({
    username : String,
    reviewdes : String,
    productDetailsId : String,
})



export const Review = mongoose.model("Review",ReviewShcema)