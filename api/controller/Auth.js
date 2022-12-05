const exp = require("express");
const User = require("../models/User");
const userstable = require("../models/UserTable.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser')
///////////multer///////

const multer = require('multer');
var path = require('path');
var csv = require('csvtojson');
const app=exp()

////////////csv//////////////////

app.use(bodyParser.urlencoded({ extended: false }));

const upload = multer({ dest: "../assets/data/uploads" });



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './assets/data/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  var uploads = multer({ storage: storage });
  
  exports.addbyMulter=(upload.array("csv"), uploadFiles);

  function uploadFiles(req, res) {
      console.log(req.body);
      console.log(req.files);
      
      res.json({ message: "Successfully uploaded files" });
  }




var cookieParser = require('cookie-parser');
const { application } = require("express");
const { stringify } = require("qs");
application.use(cookieParser())
require('dotenv').config();

//google authentication
require('../Passport.js')
const passport = require('passport');
const cookieSession = require('cookie-session');
const UserTable = require("../models/UserTable.js");
const { newvalidation } = require("../utils/UserValidation");

exports.csvAuth = (req, res) => {
   
    // the buffer here containes your file data in a byte array 
  
    console.log(req.file)
    const csvFilePath = req.file
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



exports.manuallyAddUser =( newvalidation,(req, res) => {
    // const errors = validationResult(req);
    // console.log("1",errors)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

   const data=req.body
   const usertableschema=userstable(data)
    usertableschema.save((error,data) => {
        if (error) {
            res.status(500).json(error)
        }
        else {
            res.send({ "data": data })
        }
    })
})





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

exports.updateUserType= (req,res)=>{
    const updatemodel= UserTable.findByIdAndUpdate(req.params.id,{$set:req.body},(error,data)=>{
            if(error){
                res.send("error")
            }
            else{
                res.send(data)

            }
        });
    
}
exports.deleteUser= (req,res)=>{

    const updatemodel= UserTable.findByIdAndUpdate(req.params.id,{$set:req.body},(error,data)=>{
            if(error){
                res.send(error )
            }
            else{
                res.send(data)

            }
        });
    
}
exports.finduserById=(req,res)=>{
    userstable.findById(req.params.id,(error,data)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
}

///google authentications
exports.googlelogin = (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
}
exports.googleopen = passport.authenticate('google', {
    scope:
        ['email', 'profile']
});


