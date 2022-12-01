const exp = require("express");
const User = require("../models/User");
const userstable = require("../models/UserTable.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const app=exp()
var cookieParser = require('cookie-parser');
const { application } = require("express");
const { stringify } = require("qs");
application.use(cookieParser())
require('dotenv').config();

//google authentication
require('../Passport.js')
const passport = require('passport');
const cookieSession = require('cookie-session');

exports.csvAuth = (req, res) => {
    const csvFilePath = 'simple.csv'
    const csv = require('csvtojson')
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);

            newAuthfun(jsonObj);

        })

    const newAuthfun = async (jsonObj) => {
        jsonObj.forEach(function (obj) {
            const saveuser = new userstable(obj);
            saveuser.save((error, data) => {
                if (error) {
                    res.send(error)
                }

            });
        });
        res.send("successfully saved")


    }
}
exports.newauth = (req, res) => {

    var data = {
        username: req.body.username, email: req.body.email, password: req.body.password
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        username: req.body.username, email: req.body.email, password: hash
    })

    user.save((error, data) => {
        if (error) {
            res.status(500).json(error)
        }
        else {
            res.send({ "data": data })
        }
    })
}
exports.newlogin = async (req, res, next) => {

    try {
        console.log(process.env.tk1)

        const users = await User.findOne({ username: req.body.username });
        if (users) {
            const passmatch = bcrypt.compareSync(req.body.password, users.password);
            const envtoken = process.env.tk1;

            if (passmatch) {
                const { password, isAdmin, ...otherDetails } = users._doc;
                const token = jwt.sign({ id: users._id, isAdmin: users.isAdmin }, envtoken)

                res.cookie("accesstoken", token, { httpOnly: true }).send({ "data": otherDetails, "token": token })
            }
            else {
                res.send("invalid credintials")
            }

        }
        else {
            res.send("not found")
        }

    }


    catch (error) {
        next(error)
    }


}



///google authentications
exports.googlelogin = (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
}
exports.googleopen = passport.authenticate('google', {
    scope:
        ['email', 'profile']
});


