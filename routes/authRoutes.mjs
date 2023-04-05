import { Router } from 'express';
import bodyParser from "body-parser"
import { getLoginController, getSignupController, logout, postLoginController, postSignupController } from '../controllers/authController.mjs';
import { isAuth } from './guard/isAuth.mjs';
import { check } from 'express-validator';



const router = Router();

//get signup page
router.get('/signup',isAuth,getSignupController);


// post signup page
router.post(
    '/signup',
    bodyParser.urlencoded({extended:true}),
    check('username').not().isEmpty().withMessage('userName is invalid'),
    check('email').not().isEmpty().withMessage('Email is invalid').isEmail().withMessage('Email must be email'),
    check('password').isLength({min : 6}).withMessage('min characters is 6'),
    postSignupController
)

//get login page
router.get('/login',isAuth,getLoginController);

// post login page
router.post(
    '/login',
    bodyParser.urlencoded({extended:true}),
    check('email').not().isEmpty().withMessage('Email is invalid'),
    check('password').not().isEmpty().withMessage('Password is invalid'),
    postLoginController
)


router.all(
    '/logout',
    bodyParser.urlencoded({extended:true}),
    logout
)

export default router;