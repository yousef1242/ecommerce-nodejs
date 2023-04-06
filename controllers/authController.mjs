import { postLoginModel, postSignupModel } from "../models/authModels.mjs"

import { validationResult } from "express-validator"


//get signup controller
export const getSignupController = (req,res) => {
    const cartValidator = req.flash('cartValidator')[0]
    res.render('signup',{
        isUser : req.session.userId,
        userName:req.session.userName,
        titleName : "signup",
        signupVlidatorEmail : req.flash('signupVlidatorEmail')[0],
        signupVlidatorinput : req.flash('signupVlidatorinput'),
        cartValidator : cartValidator,
    })
}



//post signup controller
export const postSignupController = (req,res) => {
    if (validationResult(req).isEmpty()) {        
        postSignupModel(req.body.username,req.body.email,req.body.password).then(() => {
            res.redirect('/login')
        }).catch(err => {
            res.redirect('/signup')
            console.log(err)
            req.flash('signupVlidatorEmail' ,err)
        })
    } else {
        res.redirect('/signup')
        req.flash('signupVlidatorinput' ,validationResult(req).array())
    }
}


//post login controller
export const postLoginController = (req,res) => {
    if (validationResult(req).isEmpty()) {
        postLoginModel(req.body.email,req.body.password).then((user) => {
            req.session.userId = user.id
            req.session.userName = user.userName
            res.redirect('/')
        }).catch(err => {
            res.redirect('/login')
            console.log(err)
            req.flash('loginVlidatorEmail' ,err)
        })
    } else {
        res.redirect('/login')
        req.flash('loginVlidatorinput' ,validationResult(req).array())
    }

}



//get login controller
export const getLoginController = (req, res) => {
    const cartValidator = req.flash('cartValidator')[0]
    res.render('login', {
      isUser: req.session.userId,
      userName: req.session.userName,
      titleName: 'login',
      loginVlidatorEmail: req.flash('loginVlidatorEmail')[0],
      loginErrors: req.flash('loginVlidatorinput'),
      cartValidator : cartValidator,
    });
  };



//logout
export const logout =(req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}