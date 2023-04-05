import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    reviews: Number,
});

export const Item = mongoose.model('Product', productSchema);

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
            Item.find({}).then((items) => {
                resolve(items);
            });
        }).catch(err => reject(err));
    });
};
