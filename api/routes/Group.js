const exp = require('express');
const app=exp();
var path = require('path');
const bodyParser=require('body-parser')
//fetch data from the request
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
const router=exp.Router();
const GroupTable=require('../models/Groups.js')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './assets/data/uploads');
    },
    filename: (req, file, cb) => {
      cb(null,new Date()+file.originalname);
    }
  });
  
  var upload= multer({ storage: storage });
  router.post("/upload",upload.array("csv"), uploadFiles);

function uploadFiles(req, res) {
    req.body.GroupImage="/api/"+req.files[0].path
    console.log(req.body);
    console.log(req.files);
   const SaveGroup=new  GroupTable(req.body)
   SaveGroup.save((error,data)=>{
    if(error){
        res.send(error)
    }
    else{
        res.send(data)
    }
   })
 
   
     }
    
    module.exports=router

  

    

