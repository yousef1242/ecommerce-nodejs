import { Router } from "express";
import { getCheckController, postCheckController } from "../controllers/checkController.mjs";
import bodyParser from "body-parser";
import { notAuth } from "./guard/isAuth.mjs";
import { check } from "express-validator";


const router = Router()


//get check page
router.get('/cart/checkout',notAuth,getCheckController)


//post check page
router.post(
    '/cart/checkout',
    bodyParser.urlencoded({extended:true}),
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
    check('adress').not().isEmpty().withMessage('Address is required'),
    check('city').not().isEmpty().withMessage('City is required'),
    check('phone').not().isEmpty().withMessage('Phone is required'),
    postCheckController
)



export default router