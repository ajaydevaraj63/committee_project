const jwt = require('jsonwebtoken');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
require('dotenv').config();
app.use(cookieParser());
require('dotenv').config();
const users = "";
exports.verifytoken = (req, res, next) => {
    // res.clearCookie('access_token');
      console.log("inside verify user")
    const token = req.rawHeaders[15];
    const accesstoken = token.replace("accesstoken=", '')
    if (!token) {
        return next();

    }
    else {
        jwt.verify(accesstoken, process.env.tk1, (err, user) => {

            if (err) {

                res.send(err)
            }
            else {
                console.log(accesstoken)
                res.user = user;
                console.log(user)
                users = user;
                next();
            }

        })
        // res.send(token)

    }
}
exports.verifyuser = (req, res, next) => {

    console.log("inside the virufy user",req.params.id);


    var token = req.rawHeaders[15];

    const accesstoken = token.replace("accesstoken=", '')
    if (!token) {
        return next();

    }
    else {
        jwt.verify(accesstoken, process.env.tk1, (err, user) => {

            if (err) {

                res.send(err)
            }
            else {
                console.log(accesstoken)
                res.user = user;
                console.log(user)



                console.log(user.id)
                console.log(req.params.id)
                if (user.id == req.params.id) {
                    console.log("valid")
                    console.log("beforenext")
                    next();
                }
                else {
                    res.send("error")
                }
            }

        })
        // res.send(token)

    }
}


    exports.verifyadmin = (req, res, next) => {


        var token = req.rawHeaders[15];
    
        const accesstoken = token.replace("accesstoken=", '')
        if (!token) {
            return next();
    
        }
        else {
            jwt.verify(accesstoken, process.env.tk1, (err, user) => {
    
                if (err) {
    
                    res.send(err)
                }
                else {
                    console.log(accesstoken)
                    res.user = user;
                    console.log(user)
    
    
    
                    console.log(user.id)
                    console.log(req.params.id)
                    if (user.id == req.params.id || user.isAdmin) {
                        console.log("valid")
                        next();
                    }
                    else {
                        res.send("error")
                    }
                }
    
            })
            // res.send(token)
    
        }
    


}


