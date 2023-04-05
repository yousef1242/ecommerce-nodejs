
import { Router } from "express"
import { deleteProduct, editProduct, getCartController, postCartPage } from "../controllers/cartController.mjs"
import bodyParser from "body-parser"
import { notAuth } from "./guard/isAuth.mjs"



const router = Router()

//get cart page
router.get('/cart',notAuth,getCartController)


//post cart page
router.post(
    '/cart',
    bodyParser.urlencoded({extended:true}),
    postCartPage
)



//delete product from cart
router.post(
    '/cart/delete',
    bodyParser.urlencoded({extended:true}),
    deleteProduct
)


//delete product from cart
router.post(
    '/cart/edit',
    bodyParser.urlencoded({extended:true}),
    editProduct
)

export default router