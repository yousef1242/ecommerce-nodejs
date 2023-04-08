


export const isAuth = (req,res,next) => {
    if (req.session.userId) {
        res.redirect('/')
    } else {
        next()
    }
}



export const notAuth = (req,res,next) => {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/')
        req.flash('reviewAuthError','you need to signup!!')
    }
}