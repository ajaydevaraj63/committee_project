var csv = require('csvtojson');
const exp = require('express');
const app = exp();
///////////////////////json body validation///////////////////////
const Joi = require('@hapi/joi');
var path = require('path');
const userstable = require('../models/UserTable.js')
const bodyParser = require('body-parser')
const { newvalidation } = require("../utils/UserValidation");
var errorData;
//fetch data from the request
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/data/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date() + file.originalname);
  }
});

var upload = multer({ storage: storage,fileFilter: function(req, file, callback) {
  if(path.extname(file.originalname) !== '.csv') {
    return callback(new Error('Only	csv files allowed!'));
  }
  callback(null, true)
} });

//////////////////////csv validation///////////////
const schema = Joi.object().keys({
  UserName: Joi.string().alphanum().min(3).max(30).required(),
  DOB: Joi.string().required(),
  Email: Joi.string().min(3).required().email().required(),
  Designation: Joi.string().required(),
  Type: Joi.number().required()
});

//static folder
app.use(exp.static(path.resolve(__dirname, 'public')));
const { newauth, newlogin, csvAuth, googlelogin, googleopen, manuallyAddUser, updateUserType, deleteUser, finduserById, multeradd, addbyMulter } = require('../controller/Auth');
const { register } = require('../utils/UserValidation');
const UserTable = require('../models/UserTable.js');
const router = exp.Router();
router.post("/post", newauth)
router.post("/login", newlogin)
router.post("/csv/Upload", csvAuth)
router.post("/upload", upload.array("csv"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  csv()
    .fromFile(req.files[0].path)
    .then(async (jsonObj) => {
      try {
        console.log("1", jsonObj);
        await jsonObj.forEach(function (obj) {
          //  const saveuser = new userstable(obj);
          //  saveuser.save();
          // VALIDATE BEFORE SAVING A USER 
          const Validation = schema.validate(obj);
          errorData = schema.validate(obj);

          if (Validation.error) {

            res.send(Validation.error)
          }
        });
      }
      catch (error) {
        throw error
      }
    
       try{
        if (!errorData.error) {
          const options = { ordered: true };
          const result = await UserTable.insertMany(jsonObj, options,(error,data)=>{
            if(error){
              res.send(error.writeErrors)
            }
          else{
            res.send(data)
          }
  
          });
    
        }

       }
       catch(error){
        throw error
       }  
    }
    );
  // res.send(req.files[0].path)


}

router.get("/send", googlelogin)
router.post("/add/user/manually", register, manuallyAddUser)
router.get('', googleopen)

router.post("/update/user/type/:id", updateUserType)
router.post("/delete/user/:id", deleteUser)
router.get("/getUser/byId/:id", finduserById)
module.exports = router;