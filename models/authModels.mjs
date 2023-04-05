import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt"

const userShcema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
})



export const User = mongoose.model("User",userShcema)


//postSignupModel
export const postSignupModel = (username,email,password) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
            User.findOne({email: email}).then((user) => {
              if (user) {
                mongoose.disconnect();
                reject("email is used");
              } else {
                return bcrypt.hash(password, 10);
              }
            })
            .then((hashedPassword) => {
              const addUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
              });
              return addUser.save();
            }).then(() => {
              mongoose.disconnect();
              resolve();
            }).catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
          });
    })
}


//postLoginModel


export const postLoginModel = (email,password) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
            User.findOne({email : email}).then(user => {
                if (!user) {
                    mongoose.disconnect()
                    reject('email not found')
                } else {
                    bcrypt.compare(password,user.password).then(same => {
                        if(!same){
                            mongoose.disconnect()
                            reject('password does not match')
                        }else{
                            mongoose.disconnect()
                            resolve({
                                id : user._id,
                                userName : user.username,
                            })
                        }
                    })
                }
            })
          }).catch(err => {
            reject(err)
          })
    })
}


