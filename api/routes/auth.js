var csv = require('csvtojson');
const exp = require('express');
const app=exp();
var path = require('path');
const bodyParser=require('body-parser')
//fetch data from the request
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './assets/data/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  var upload= multer({ storage: storage });
  



//static folder
app.use(exp.static(path.resolve(__dirname, 'public')));
const { newauth, newlogin, csvAuth, googlelogin, googleopen, manuallyAddUser, updateUserType, deleteUser, finduserById, multeradd, addbyMulter } = require('../controller/Auth');
const {  register } = require('../utils/UserValidation');
const router=exp.Router();
router.post("/post",newauth)
router.post("/login",newlogin)
router.post("/csv/Upload",csvAuth)
router.post("/upload",upload.array("csv"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    csv()
    .fromFile(req.files[0].path)
    .then((jsonObj) => {
      console.log("1",jsonObj);
     res.send(jsonObj)
   
    });
    
}

router.get("/send",googlelogin)
router.post("/add/user/manually",register,manuallyAddUser)
router.get( '' ,googleopen)
router.post("/update/user/type/:id",updateUserType)
router.post("/delete/user/:id",deleteUser)
router.get("/getUser/byId/:id",finduserById)
module.exports = router;