import { Router } from "express";
import { getCheckController, postCheckController } from "../controllers/checkController.mjs";
import bodyParser from "body-parser";
import { notAuth } from "./guard/isAuth.mjs";


const router = Router()


//get check page
router.get('/cart/checkout',notAuth,getCheckController)


//post check page
router.post(
    '/cart/checkout',
    bodyParser.urlencoded({extended:true}),
    postCheckController
)



export default router